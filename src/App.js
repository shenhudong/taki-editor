/**
 * 参考：
 * http://quilljs.com/docs/formats/
 */

import Quill from 'quill'
import './index.css'

const editorContainer = {
  render() {
    return (
      <div id="editor"></div>
    )
  }
}

const SizeStyle = Quill.import('attributors/style/size')
const ColorStyle = Quill.import('attributors/style/color')
const AlignStyle = Quill.import('attributors/style/align')
const Clipboard = Quill.import('modules/clipboard')
const Delta = Quill.import('delta')

class PlainClipboard extends Clipboard {
  convert(html = null) {
    if (typeof html === 'string') {
      this.container.innerHTML = html
    }
    let text = this.container.innerText
    this.container.innerHTML = ''
    return new Delta().insert(text)
  }
}

SizeStyle.whitelist = ['14px', '16px', '18px', '1em', '2em', '3em']

Quill.register(ColorStyle, true)
Quill.register(SizeStyle, true)
Quill.register(AlignStyle, true)

const app = {
  name: 'app',
  components: { editorContainer },

  editor: null,
  selection: null,

  render() {
    return (
      <div class="editor-container">
        <div class="toolbar">
          <button onClick={this.toggleItalic}>I</button>
          <button onClick={this.toggleBold}>B</button>
          <button onClick={this.toggleUnderline}>U</button>
          <button onClick={this.toggleAnchor}>a</button>
          <button onClick={this.toggleFontSize14px}>14px</button>
          <button onClick={this.toggleFontSize16px}>16px</button>
          <button onClick={this.toggleFontSize18px}>18px</button>
          <br/>
          <button onClick={this.toggleListBullet}>ul</button>
          <button onClick={this.toggleListOrdered}>ol</button>
          <button onClick={this.insertImage}>img</button>
          <button onClick={this.toggleParagraph}>p</button>
          <button onClick={this.toggleH1}>H1</button>
          <button onClick={this.toggleH2}>H2</button>
          <button onClick={this.toggleH3}>H3</button>
          <br/>
          <button>Align left</button>
          <button>Align center</button>
          <button>Align right</button>
          <br/>
          <button onClick={this.toggleColorDefault}>color-normal</button>
          <button onClick={this.toggleColorRed}>color-red</button>
          <button onClick={this.toggleColorGreen}>color-green</button>
        </div>
        <editor-container key="editor" />
      </div>
    )
  },
  mounted() {
    const editor = new Quill('#editor', {
      modules: {
        toolbar: false
      }
    })

    editor.on('selection-change', (range, oldRange, source) => {
      this.$options.selection = range || oldRange
      this.checkFormat()
    })

    this.$options.editor = editor

    editor.setText('Hello, World!')

    setTimeout(() => {
      editor.setSelection({ index: 0, length: 6 })
    }, 0)
  },
  methods: {
    checkFormat() {
      const { selection, editor } = this.$options
      const format = editor.getFormat()
      console.log(format)
    },
    toggleItalic() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('italic', true)
      this.checkFormat()
    },
    toggleBold() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('bold', true)
      this.checkFormat()
    },
    toggleUnderline() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('underline', true)
      this.checkFormat()
    },
    toggleAnchor() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('link', 'www.baidu.com')
      this.checkFormat()
    },
    insertImage() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.clipboard.dangerouslyPasteHTML(selection.index, '<img src="hello" alt="" />')
      this.checkFormat()
    },
    toggleListBullet() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('list', 'bullet')
      this.checkFormat()
    },
    toggleListOrdered() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('list', 'ordered')
      this.checkFormat()
    },
    toggleParagraph() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('header', false)
      this.checkFormat()
    },
    toggleH1() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('header', 'h1')
      this.checkFormat()
    },
    toggleH2() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('header', 'h2')
      this.checkFormat()
    },
    toggleH3() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('header', 'h3')
      this.checkFormat()
    },
    toggleFontSize14px() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.formatText(selection, 'size', '1em')
      this.checkFormat()
    },
    toggleFontSize16px() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.formatText(selection, 'size', '2em')
      this.checkFormat()
    },
    toggleFontSize18px() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.formatText(selection, 'size', '3em')
      this.checkFormat()
    },
    toggleColorDefault() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('color', false)
      this.checkFormat()
    },
    toggleColorRed() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('color', '#f00')
      this.checkFormat()
    },
    toggleColorGreen() {
      const { selection, editor } = this.$options
      editor.setSelection(selection)
      editor.format('color', '#0f0')
      this.checkFormat()
    }
  }
}

export default app