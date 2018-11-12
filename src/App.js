import Quill from 'quill'

const editorContainer = {
  render() {
    return (
      <div id="editor"></div>
    )
  }
}

const app = {
  name: 'app',
  components: {
    editorContainer
  },
  render() {
    return (
      <editor-container key="editor" />
    )
  },
  mounted() {
    let SizeStyle = Quill.import('attributors/style/size')
    let ColorStyle = Quill.import('attributors/style/color')
    let AlignStyle = Quill.import('attributors/style/align')

    Quill.register(ColorStyle, true)
    Quill.register(SizeStyle, true)
    Quill.register(AlignStyle, true)

    const editor = new Quill('#editor', {
      modules: {
        toolbar: false
      }
    })

    editor.setText('Hello\nWorld!\n')
    editor.formatText(0, 2, 'color', 'red')
    editor.formatText(0, 5, 'bold', true)
    editor.formatText(0, 5, { 'bold': false, 'color': 'rgb(0, 0, 255)' })
    editor.formatText(5, 1, 'align', 'right')
  }
}

export default app