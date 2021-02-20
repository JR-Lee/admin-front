<template>
  <span @click="noteHandler">
    <slot></slot>
  </span>
  <el-drawer v-model="visible" custom-class="note-drawer" :with-header="false" append-to-body>
    <jr-block :title="`本地便签${notes.length ? ' (' + notes.length + ')' : ''}`" body-class="note-list_wrap">
      <template #header-extra>
        <el-button @click="addHandler" size="mini" plain>新建</el-button>
      </template>
      <template #divider>
        <el-alert style="border-radius: 0px;" title="本地便签将数据存放于本地" :closable="false" show-icon></el-alert>
      </template>
      <ul v-if="notes.length" class="note-list">
        <li v-for="note in notes.sort((current, next) => next.time - current.time)" :key="note.time">
          <header class="note-header">
            <i class="iconfont icon-dingzi"></i>
            <span @click="deleteHandler(note)">删除</span>
          </header>
          <section class="note-body">
            <span>{{ note.content }}</span>
          </section>
          <footer class="note-footer">
            <time>{{ formatDate(new Date(note.time), 'yyyy-MM-dd HH:mm') }}</time>
          </footer>
        </li>
      </ul>
      <el-empty v-else description="暂无便签哦~"></el-empty>
    </jr-block>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { storage, formatDate } from '@/utils'

interface Note {
  time: number;
  content: string;
}

function useNote() {
  const visible = ref(false)
  const noteHandler = () => visible.value = true

  const notes = ref<Note[]>(storage.get('notes') || [])
  const deleteHandler = (note: Note) => {
    const newNotes = notes.value.filter(item => item !== note)
    notes.value = newNotes
    storage.set('notes', newNotes)
  }
  const addHandler = () => {
    ElMessageBox.prompt('', '新增便签', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({ value }) => {
      if (!value) return

      const oldNotes = storage.get('notes') || []
      oldNotes.push({ time: Date.now(), content: value })
      notes.value = oldNotes
      storage.set('notes', oldNotes)
    }).catch(err => {
      console.log(err)
    })
  }

  return { visible, noteHandler, notes, deleteHandler, addHandler }
}

export default defineComponent({
  setup () {
    const { visible, noteHandler, notes, deleteHandler, addHandler } = useNote()

    return {
      visible, noteHandler, notes, deleteHandler, addHandler,
      formatDate
    }
  }
})
</script>

<style lang="scss">
  .note-drawer {
    .el-drawer__body {
      display: flex;
      flex-direction: column;
      height: 100%;

      .note-list_wrap {
        height: 100%;
        overflow-y: auto
      }
    }
  }
</style>

<style lang="scss" scoped>
  .note-list {
    > li {
      position: relative;
      width: 100%;
      padding: 10px;
      background: #c2e8bf;
      border-radius: 2px;
      box-sizing: border-box;
      transition: box-shadow .2s;

      + li {
        margin-top: $spacing;
      }

      &:hover {
        box-shadow: #c2e8bf 2px 2px 6px;

        .note-header > span {
          opacity: 1;
        }
      }
    }

    .note-header {
      display: flex;
      justify-content: space-between;

      > span {
        cursor: pointer;
        font-size: $size-text-small-2x;
        opacity: 0;
        transition: all .2s;

        &:hover {
          color: $--color-info;
        }
      }
    }

    .note-body {
      padding: 20px 10px;
      text-indent: 2rem;
    }

    .note-footer {
      // color: $--color-info;
      text-align: right;
      font-size: $size-text-small;
    }
  }
</style>
