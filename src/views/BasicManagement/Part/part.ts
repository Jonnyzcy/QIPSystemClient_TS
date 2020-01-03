import CanvasFilaed from '@/components/CanvasFilaed/index.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: {
    CanvasFilaed
  }
})

export default class extends Vue {
  private listQuery = {
    page: 1,
    limit: 5,
    importance: undefined,
    title: undefined,
    type: undefined,
    sort: '+id'
  }
  PartList: any = []
  list = null
  total = 0
  listLoading: boolean = true
  dialogPvVisible: boolean = false
  dialogpartVisible: boolean = false
  dialogStatus: string = ''
  inittempList: any = []
  temp: {
    id: undefined
    importance: number
    remark: string
    timestamp: Date
    title: string
    status: string
    type: string
  } | undefined
  created() {
    this.getList()
  }
  @Watch('child')
  getList() {
    this.listLoading = true
    this.inittempList = [[489, 122], [322, 150]]
  }
  handleCreate() {
    this.resetTemp()
    this.dialogStatus = 'create'
    this.dialogpartVisible = true
  }
  resetTemp() {
    this.temp = {
      id: undefined,
      importance: 1,
      remark: '',
      timestamp: new Date(),
      title: '',
      status: 'published',
      type: ''
    }
  }
}
