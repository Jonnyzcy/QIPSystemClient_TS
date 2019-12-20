/* eslint-disable */
import CanvasFilaed from '@/components/CanvasFilaed/CanvasFilaed'
import { Form as ElForm, Input, Table } from "element-ui";
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import { getArticles, getPageviews, createArticle, updateArticle, defaultArticleData } from '@/api/articles'
import { IArticleData } from '@/api/types'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
import Pagination from '@/components/Pagination/index.vue'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc: { [key: string]: string }, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {}) as { [key: string]: string }


@Component({
  name: "ComplexTable",
  components: {
    CanvasFilaed,
    Pagination
  }, filters: {
    typeFilter: (type: string) => {
      return calendarTypeKeyValue[type]
    }
  }
})

// arr to obj, such as { CN : "China", US : "USA" }
export default class extends Vue {
  /**DEMO */
  private Datetimes: any = '';
  private tableKey = 0
  private dialogdetail = false;
  private list: IArticleData[] = []
  private Sizelist: IArticleData[] = []
  private total = 0
  private Sizetotal = 0
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 5,
    importance: undefined,
    title: undefined,
    type: undefined,
    sort: '+id'
  }
  private SizelistQuery = {
    page: 1,
    limit: 20,
    importance: undefined,
    title: undefined,
    type: undefined,
    sort: '+id'
  }
  private importanceOptions = [1, 2, 3]
  private calendarTypeOptions = calendarTypeOptions
  private sortOptions = [
    { label: 'ID Ascending', key: '+id' },
    { label: 'ID Descending', key: '-id' }
  ]
  private statusOptions = ['published', 'draft', 'deleted']
  private showReviewer = false
  private dialogFormVisible = false
  private dialogStatus = ''
  private textMap = {
    update: 'Edit',
    create: 'Create'
  }
  private dialogPageviewsVisible = false
  private pageviewsData = []
  private rules = {
    type: [{ required: true, message: 'type is required', trigger: 'change' }],
    timestamp: [{ required: true, message: 'timestamp is required', trigger: 'change' }],
    title: [{ required: true, message: 'title is required', trigger: 'blur' }]
  }
  private downloadLoading = false
  private tempArticleData = defaultArticleData
  private filledType: any;
  private radiofill: string = '';
  private dialogPvVisible: boolean = false;
  private radioUK: string = '';
  private radioUKerror: string = '';
  private radioMessage: any = null;
  private errorLists: Array<any> = [];
  multipleSelection: any;
  private checkList: number = 0;
  checkSizeID: number = -1;
  SizelistLoading: boolean = false;

  /**Demo end */

  created() {
    this.initData();
  }

  private async initData() {
    let that = this;
    that.listLoading = true;
    const { data } = await getArticles(this.listQuery)
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private async initSizeData(id: any) {
    let that = this;
    that.SizelistLoading = true;
    const { data } = await getArticles(this.SizelistQuery)
    this.Sizelist = data.items
    this.Sizetotal = data.total
    setTimeout(() => {
      this.SizelistLoading = false
    }, 0.5 * 1000)
  }
  //筛选
  private handleFilter() {
    let that = this;
    that.listLoading = true;

  }
  private handleModifyStatus(row: any, status: string) {
    this.$message({
      message: '操作成功',
      type: 'success'
    })
    row.status = status
  }
  private sortChange(data: any) {
    const { prop, order } = data
    if (prop === 'id') {
      this.sortByID(order)
    }
  }
  private sortByID(order: string) {
    if (order === 'ascending') {
      this.listQuery.sort = '+id'
    } else {
      this.listQuery.sort = '-id'
    }
    this.handleFilter()
  }
  private getSortClass(key: string) {
    const sort = this.listQuery.sort
    return sort === `+${key}` ? 'ascending' : sort === `-${key}` ? 'descending' : ''
  }
  private resetTempArticleData() {
    this.tempArticleData = cloneDeep(defaultArticleData)
  }
  private handleCreate() {
    this.resetTempArticleData()
    this.dialogStatus = 'create'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs['dataForm'] as Form).clearValidate()
    })
  }
  private createData() {
    (this.$refs['dataForm'] as Form).validate(async (valid) => {
      if (valid) {
        let { id, ...articleData } = this.tempArticleData
        articleData.author = 'vue-typescript-admin'
        const { data } = await createArticle({ article: articleData })
        this.list.unshift(data.article)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      }
    })
  }
  private handleUpdate(row: any) {
    this.tempArticleData = Object.assign({}, row)
    this.tempArticleData.timestamp = +new Date(this.tempArticleData.timestamp)
    this.dialogStatus = 'update'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs['dataForm'] as Form).clearValidate()
    })
  }
  @Watch('child')
  private handleSelectionChange(row: any) {
    // // console.log(val);
    let that = this;
    // //console.log(val[0].id);
    // console.log(that.checkList);
    (that.$refs.multipleTable as Table).clearSelection();
    (that.$refs.multipleTable as Table).toggleRowSelection(row)
    that.checkList = row.id;
    that.checkSizeID = -1;
    that.initSizeData(that.checkList)
  }
  //SIZE选中行
  private handleSizerowclickChange(row: any) {
    let that = this;
    (that.$refs.multipleSizeTable as Table).clearSelection();
    (that.$refs.multipleSizeTable as Table).toggleRowSelection(row)
    that.checkSizeID = row.id;
  }
  private handleSizeSelectionChange(val: any) {
    let that = this;
    (that.$refs.multipleSizeTable as Table).clearSelection();
  }
  private updateData() {
    (this.$refs['dataForm'] as Form).validate(async (valid) => {
      if (valid) {
        const tempData = Object.assign({}, this.tempArticleData)
        tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        const { data } = await updateArticle(tempData.id, { article: tempData })
        for (const v of this.list) {
          if (v.id === data.article.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1, data.article)
            break
          }
        }
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      }
    })
  }
  private async handleGetPageviews(pageviews: string) {
    const { data } = await getPageviews({ /* Your params here */ })
    this.pageviewsData = data.pageviews
    this.dialogPageviewsVisible = true
  }
  private radioChange(val: any) {
    this.checkSizeID = val;
  }
  private handlefilled() {
    let that = this;
    let size = that.checkSizeID;
    console.log(size);
    let message = "你操作的SIZE:" + size + ",操作成功！"
    if (size > 0) {
      that.dialogdetail = true;
    } else {
      this.$message.error('请选择SIZE');
    }
  }
  private handlesuccess() {
    let that = this;
    let size = that.checkSizeID;
    let message = "你操作的SIZE:" + size + ",操作成功！"
    if (size > 0) {
      this.$message({
        message: message,
        type: 'success'
      });
    } else {
      this.$message.error('请选择SIZE');
    }
  }
}
