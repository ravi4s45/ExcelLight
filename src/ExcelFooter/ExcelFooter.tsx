import styles from './ExcelFooter.module.scss'
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const ExcelFooter = () => {
    return(
    <div className={styles.ExcelFooterContainer}>
    <ArrowBackIosIcon fontSize="small"/>
    <ArrowForwardIosIcon fontSize="small"/>
    <MenuIcon/>
    <div>Sheet1</div>
    <AddIcon/>

    </div>
    )
};
export default ExcelFooter;