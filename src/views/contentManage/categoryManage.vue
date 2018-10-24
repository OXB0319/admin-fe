<template>
    <div class="app-container">
        <div class="category-content">
            <el-col :span="4">
                <el-input placeholder="名称" width="100" clearable></el-input>
            </el-col>
            <el-col :span="10">
                &nbsp;
                <el-button type="primary">搜索</el-button>

                <el-button type="primary" @click="toAdd"><span class="fa fa-plus"></span> &nbsp;添加</el-button>
                <el-button type="primary" @click="getList"><span class="fa fa-refresh"></span> &nbsp;刷新</el-button>
            </el-col>
        </div>

        <div class="category-content">
            <el-table :data="list">
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>

                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button v-if="scope.row.status==='DOWN'" type="text"
                                   @click="toChangeStatus(scope.row, 'UP')">上架
                        </el-button>
                        <el-button v-if="scope.row.status==='UP'" type="text"
                                   @click="toChangeStatus(scope.row, 'DOWN')">下架
                        </el-button>
                        <el-button type="text" @click="toDelete(scope.row)">删除</el-button>
                        <el-button type="text" @click="toEdit(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :visible="modal !== ''"
                   title="添加分类"
                   width="400px"
                   @close="cancelEdit">
            <el-form ref="addCategory" :model="selectCategory" :rules="addCategoryRules" label-width="100px">
                <el-form-item prop="name" label="名称">
                    <el-input v-model="selectCategory.name"></el-input>
                </el-form-item>

                <el-form-item label="是否上线">
                    <el-switch
                            v-model="selectCategory.status"
                            active-value="UP"
                            inactive-value="DOWN"></el-switch>
                </el-form-item>

                <el-form-item v-if="modal===this.modalEnum.ADD">
                    <el-button type="primary" @click="sureAdd">确认</el-button>
                    <el-button type="cancel" @click="cancelEdit">取消</el-button>
                </el-form-item>

                <el-form-item v-if="modal===this.modalEnum.EDIT">
                    <el-button type="primary" @click="sureEdit">确认</el-button>
                    <el-button type="cancel" @click="cancelEdit">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data: () => ({
            list: [],
            modal: '',
            selectCategory: {
                name: '',
                status: 'DOWN'
            },
            addCategoryRules: {
                name: [
                    {required: true, message: '请输入活动名称', trigger: 'blur'},
                ]
            },
            editDialog:false,
            modalEnum:{
                DEFAULT:'',
                ADD:'add',
                EDIT:'edit'
            }
        }),

        mounted: function () {
            this.getList();
        },

        computed:{
          // showDialog:()=>this.modal!==this.modalEnum.DEFAULT
        },
        methods: {
            initAddCategory() {
                this.selectCategory = {
                    name: '',
                    status: ''
                }
            },
            initEditCategory(category){
               this.selectCategory = category;
            },
            toAdd() {
                this.initAddCategory();
                this.setModal(this.modalEnum.ADD);
            },
            cancelEdit() {
                this.setModal(this.modalEnum.DEFAULT);
            },
            async getList() {
                const {data} = await this.api.getCategoryList();
                this.list = data.result;
            },
            async toDelete(category) {
                const toSure = await this.$confirm('确认删除?').catch(() => {
                    this.$message.info('已取消')
                })

                if (toSure) {
                    const {data} = await this.api.deleteCategory(category)
                    if (data.code === "200") {
                        this.$notify({
                            title: '删除成功',
                            message: '删除分类成功',
                            type: 'success'
                        });
                        this.getList();
                    }
                }
            },
            async toChangeStatus(category, status) {
                const toSure = await this.$confirm('确认上架？',).catch(() => {
                    console.log('cancel');
                })

                if (toSure) {
                    category.status = status;
                    const {data} = await this.api.updateCategory(category);
                    if (data.code === "200") {
                        this.getList();
                    }
                }
            },
            async sureAdd() {
                const validated = await this.$refs['addCategory'].validate();
                if (validated) {
                    this.submitAddCategory();
                }
            },
            async submitAddCategory() {
                console.log(this.addCategory);
                const toSure = await this.$confirm('是否确认新增分类?').catch((error) => {
                    console.log(error)
                });
                if (toSure) {
                    const {data} = await this.api.addCategory(this.selectCategory);

                    if (data.code === "200") {
                        this.$notify.success("添加分类成功！")
                        this.setModal(this.modalEnum.DEFAULT);
                        this.getList();
                    }
                }
            },

            toEdit(category){
                this.initEditCategory(category);
                this.setModal(this.modalEnum.EDIT)
            },
            async sureEdit(){
                const validated = await this.$refs['addCategory'].validate();
                if (validated) {
                    this.submitEidtCategory();
                }
            },
            async submitEidtCategory() {
                console.log(this.addCategory);
                const toSure = await this.$confirm('是否确认修改分类?').catch((error) => {
                    console.log(error)
                });
                if (toSure) {
                    const {data} = await this.api.updateCategory(this.selectCategory);

                    if (data.code === "200") {
                        this.$notify.success("修改分类成功！")
                        this.setModal(this.modalEnum.DEFAULT);
                        this.getList();
                    }
                }
            },
            setModal(modal){
                this.modal = modal;
            }
        }
    }
</script>

<style lang="scss">
    /*.category-content {*/
        /*padding: 2rem;*/
    /*}*/

    .el-table__row{
        td{
            padding-top: 1px;
            padding-bottom: 1px;
        }
    }
</style>