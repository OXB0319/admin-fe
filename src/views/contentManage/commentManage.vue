<template>
    <div class="app-container">
        <div>
            <el-form :inline="true">
                <el-form-item label="内容">
                    <el-input v-model="search.content" placeholder="内容"></el-input>
                </el-form-item>
                <!--<el-form-item label="来源">-->
                    <!--<el-select v-model="search.source" clearable>-->
                        <!--<el-option v-for="(value, key) in sourceEnum" :label="key" :value="value">{{key}}</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
            </el-form>
            <el-form :inline="true">
                <el-form-item label="入库时间从">
                    <el-date-picker
                            v-model="dateRange"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @handleClear="doSearch">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="doSearch">搜索</el-button>
                    <el-button type="primary" @click="getList"><span class="fa fa-refresh"></span> &nbsp;刷新</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="category-content">
            <el-table :data="list">
                <el-table-column type="index" label="序号" width="100px"></el-table-column>
                <el-table-column prop="id" label="用户" width="200px"></el-table-column>
                <el-table-column prop="content" label="内容"></el-table-column>
                <el-table-column prop="createTime" label="发表时间"></el-table-column>

                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" @click="toDelete(scope.row)">删除</el-button>
                        <el-button type="text" @click="toDetail(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="margin-top: 20px">
                <el-pagination
                        :total="pagenation.total"
                        v-if="pagenation.total > 0"
                        :current-page="pagenation.pageNum"
                        :page-size="pagenation.rows"
                        :page-count="pagenation.total/pagenation.rows"
                        layout="total, sizes, prev, pager, next, jumper"
                        :page-sizes="[10, 20, 40, 100]"
                        @size-change="handleSizeChange"
                        @current-change="handleChangeCurrentPage">

                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            list: [{
                name: '',
                content: '',
                source: '',
                createTime: ''
            }],
            search: {
                content: '',
                source: ''
            },
            addDialog: false,
            eidtContent: {},
            dateRange: {},
            sourceEnum: {},
            pagenation: {
                rows: 10,
                pageNum: 1,
                total: 0
            }
        }),

        mounted: async function () {
            this.getList();
        },

        methods: {
            toEdit(content) {
                this.eidtContent = content;
                this.editDialog = true;
            },
            cancelAdd() {
                this.editDialog = false;
            },
            doSearch(){
              this.pagenation.pageNum = 1;
              this.getList();
            },
            async getList() {

                let param = {
                    content: '',
                    source: '',
                    startTime: '',
                    endTime: '',
                    page: this.pagenation.pageNum,
                    rows: this.pagenation.rows
                };

                if (this.dateRange && this.dateRange[0]) {
                    param.startTime = this.getTimeFromat(this.dateRange[0])
                    param.endTime = this.getTimeFromat(this.dateRange[1])
                }

                param.content = this.search.content
                param.source = this.search.source

                const {data} = await this.api.getCommentList(param);
                const {total, rows} = data.result;
                this.pagenation.total = total

                this.list = rows || [];
            },

            async toDelete(content) {
                const toSure = await this.$confirm('确认删除?').catch(() => {
                    console.log('cancel')
                })

                if (toSure) {
                    const {data} = await this.api.deleteContent(content)
                    if (data.code === "200") {
                        this.$notify({
                            title: '删除成功',
                            message: '删除内容成功',
                            type: 'success'
                        });
                        this.getList();
                    }
                }
            },

            async toChangeStatus(content, status) {
                const toSure = await this.$confirm('确认更改状态？',).catch(() => {
                    console.log('cancel');
                })

                if (toSure) {
                    let param = Object.assign({}, content);
                    param.status = status;
                    param.source = content.source.key;
                    content.status = status;
                    const {data} = await this.api.updateContent(param);
                    if (data.code === "200") {
                        this.getList();
                    }
                }
            },

            getTimeFromat(timespan) {
                let date = new Date(timespan);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;

                let day = date.getDate();

                return `${year}-${month > 9 ? month : '0' + month }-${day > 9 ? day : '0' + day}T00:00`
            },

            toDetail(content) {
                this.$router.push({
                    name: 'contentDetail',
                    query: {
                        id: content.id
                    }
                })
            },

            async handleSizeChange(val) {
                this.pagenation.rows = val;

                await this.getList();
            },
            async handleChangeCurrentPage(val) {
                this.pagenation.pageNum = val;

                await this.getList()
            }
        }
    }
</script>

<style lang="scss">
    /*.category-content {*/
    /*padding: 2rem;*/
    /*}*/

    .el-date-editor .el-range-separator {
        padding: 0;
    }

    .el-table__row{
        td{
            padding-top: 1px;
            padding-bottom: 1px;
        }
    }
</style>