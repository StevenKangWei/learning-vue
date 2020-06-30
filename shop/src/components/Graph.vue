<template>
    <div class="template-root">
        <el-row>
            <el-col :span="5">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content">
                    <el-container class=".main-container">
                        <el-header>Header</el-header>
                        <el-main>
                            <div ref="graph"></div>
                        </el-main>
                    </el-container>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import mx from './mxgraph'

export default {
    mounted() {
        this.draw()
    },
    methods: {
        draw() {


            if (!mx.mxClient.isBrowserSupported()) {
                this.$message.error('Browser is not supported!')
                return
            }
            // Disables the built-in context menu
            mx.mxEvent.disableContextMenu(this.$refs.graph)

            // Creates the graph inside the given container
            var graph = new mx.mxGraph(this.$refs.graph)

            // Enables rubberband selection
            new mx.mxRubberband(graph)

            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).
            var parent = graph.getDefaultParent()

            // Adds cells to the model in a single step
            graph.getModel().beginUpdate()
            try {
                var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
                var v2 = graph.insertVertex(parent, null, 'World!', 100, 150, 80, 30);
                var e1 = graph.insertEdge(parent, null, 'This is cool', v1, v2);
            } finally {
                // Updates the display
                graph.getModel().endUpdate()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.template-root {
    height: 100%;
}

.main-container {
    height: 100%;
}

.el-container{
    height: 100%;
}

.el-row {
    margin-bottom: 20px;
    height: 100%;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    height: 100%;
}

.grid-content {
    height: 100%;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
}

.el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    border-radius: 4px;
}

.el-header {
    margin-top: 2rem;
}
</style>