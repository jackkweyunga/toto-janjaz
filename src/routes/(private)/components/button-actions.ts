const chainer = (editor: any, fn: any) => editor?.chain().focus()[fn]().run();

const toggleBold = (editor: any) => chainer(editor, 'toggleBold');
const toggleItalic = (editor: any) => editor?.chain().focus().toggleItalic().run();
const toggleStrike = (editor: any) => editor?.chain().focus().toggleStrike().run();
const toggleHeading = (editor: any, level: number) => editor?.chain().focus().toggleHeading({level}).run();
const setImage = (editor: any, url: string) => editor.chain().focus().setImage({src: url}).run()
const addYoutubeVideo = (editor: any, url: string, width: string, height: string) => {
    editor.commands.setYoutubeVideo({
        src: url,
        // width: Math.max(320, parseInt(width, 10)) || 640,
        // height: Math.max(180, parseInt(height, 10)) || 380,
    })
}
export {toggleBold, toggleItalic, toggleStrike, toggleHeading, setImage, addYoutubeVideo};

