<template>
    <div class="content-container">
        <el-form ref="editContent">
                <el-form-item >

                    标题： <el-input v-model="content.title" style="width: 200px"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;

                    分类： <el-input v-model="content.category" style="width: 200px"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;

                    来源： <el-input v-model="content.source" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item :inline="false" label="正文(采用富文本编辑器)"></el-form-item>
                <el-form-item :inline="false">
                    <quill-editor ref="myTextEditor"
                                  v-model="content.content"
                                  :config="editorOption"
                                  @change="changeText"
                                  :options="{size:'large'}">
                    </quill-editor>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="sureEdit">提交</el-button>
                </el-form-item>
        </el-form>
    </div>
</template>


<script>
    export default {
        data: () => ({
            content: {
                title: '',
                category: '',
                content: ''
            },
            editorOption: {
                // something config
            }
        }),
        mounted() {
            this.getDetail()
        },
        methods: {
            async getDetail() {
                let id = this.$route.query.id;
                let {data} = await this.api.getContentDetail(id);

                if (data.result) {
                    this.content = data.result;
                }
            },
            changeText() {
                console.log(this.content.content);
            },
            async sureEdit(){
                // const validated = await this.$refs['editContent'].validate();
                // if (validated) {
                //     this.submitEidtCategory();
                // }
                this.submitEidtContent();
            },
            async submitEidtContent() {
                console.log(this.content);
                const toSure = await this.$confirm('是否确认修改?').catch((error) => {
                    console.log(error)
                });
                if (toSure) {
                    let param = Object.assign({}, this.content);
                    // param.source = this.content.source.key;

                    const {data} = await this.api.updateContent(param);

                    if (data.code === "200") {
                        this.$notify.success("修改成功！")
                        this.getDetail();
                    }
                }
            },
        }
    }

</script>

<style lang="scss">

    .content-container {
        padding: 3rem;
    }

</style>