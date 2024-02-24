import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import styles from '../CurrentCellFunction/MainTable.module.scss'
export function CellActionBar(){

    return (
        <>
        <div className={styles.CellActionBar}>
        <ContentCopyIcon/>
        <ContentCutIcon/>
        <ContentPasteIcon/>
        <select className="font-family-prop">
            <option value="monospace">Monospace</option>
            <option value="sans-serif">Sans-Serif</option>
            <option value="fantasy">Fantasy</option>
            <option value="cursive">Cursive</option>
        </select>

        <select className="font-size-prop">
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
        </select>
        <FormatBoldIcon/>
        <FormatItalicIcon/>
        <FormatUnderlinedIcon/>
        <FormatAlignLeftIcon/>
        <FormatAlignCenterIcon/>
        <FormatAlignRightIcon/>
        </div>
        </>
    )
}