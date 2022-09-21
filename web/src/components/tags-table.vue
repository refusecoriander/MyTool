<template>
    <md-table
      v-model="searched"
      md-sort="name"
      md-sort-order="asc"
      md-card
      md-fixed-header
      class="tags"
    >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title" >DICOM Tags</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="搜索..."
            v-model="search"
            @input="searchOnTable"
          />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No tags found"
        :md-description="`No tags found for this '${search}' query.`"
      >
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" class="tags">
        <md-table-cell md-label="Name" md-sort-by="name" md-numeric  style="word-break: break-all">{{
          item.name
        }}</md-table-cell>
        <md-table-cell md-label="Value" md-sort-by="value" style="word-break: break-all" class="zhi">{{
          item.value
        }}</md-table-cell>
      </md-table-row>
    </md-table>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}

const searchAll = (items, term) => {
  if (term) {
    return items.filter(item => {
      return (
        toLower(item.name).includes(toLower(term)) ||
        toLower(item.value).includes(toLower(term))
      )
    })
  }
  return items
}

export default {
  name: 'TagsTable',
  props: ['tagsData'],
  data: () => ({
    search: null,
    searched: []
  }),
  methods: {
    searchOnTable() {
      this.searched = searchAll(this.tagsData, this.search)
    }
  },
  created() {
    this.searched = this.tagsData
  }
}
</script>
<style lang="less" scoped>
.zhi{
  text-align: left;
}
.tags{
  width: 100%;
}
// .el-scrollbar .el-scrollbar__wrap{
//   overflow-x: hidden;
// }
</style>
