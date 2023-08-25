import { reactive, toRefs } from 'vue'

/** 表格 */
interface Table<T> {
  /** 列表数据 */
  list: T[]
  /** 加载 loading */
  loading: boolean
}

/** 分页 */
interface Paging {
  /** 页码 */
  pageNo: number
  /** 页数 */
  pageSize: number
  /** 总条数 */
  totalNum: number
}

/** 状态 */
interface State<T> {
  table: Table<T>
  paging: Paging
}

/** 参数 */
interface Options<T> {
  request: (options: { paging: Paging }) => Promise<
    | {
        list: T[]
        totalNum: number
      }
    | undefined
  >
}

const defaultPageNo = 1
const defaultPageSize = 10

export const useTable = <T>(options: Options<T>) => {
  const { request } = options

  const state: State<T> = reactive({
    table: {
      list: [],
      loading: false
    },
    paging: {
      pageNo: defaultPageNo,
      pageSize: defaultPageSize,
      totalNum: 0
    }
  })

  /**
   * 获取表格数据
   */
  const handleGetTableList = async () => {
    try {
      state.table.loading = true
      const result = await request({
        paging: state.paging
      })
      state.table.list = result?.list ?? []
      state.paging.totalNum = result?.totalNum ?? 0
    } finally {
      state.table.loading = false
    }
  }

  /**
   * 重置分页数据
   */
  const handlePagingReset = () => {
    state.paging.pageNo = defaultPageNo
    state.paging.pageSize = defaultPageSize
  }

  /**
   * 页数改变回调事件
   * @param pageSize 页数
   */
  const handlePagingPageSizeChange = (pageSize: number) => {
    state.paging.pageNo = 1
    state.paging.pageSize = pageSize
    handleGetTableList()
  }

  /**
   * 页码改变回调事件
   * @param pageNo 页码
   */
  const handlePagingPageCurrentChange = (pageNo: number) => {
    state.paging.pageNo = pageNo
    handleGetTableList()
  }

  return {
    ...toRefs(state),
    handleGetTableList,
    handlePagingReset,
    handlePagingPageSizeChange,
    handlePagingPageCurrentChange
  }
}
