import { useState } from 'react';
import styles from './MenuBar.module.scss'
export function MenuBar(){
 const [itemClicked,setItemClicked] = useState('Home');
 const handleClick = (selectedNavItem:string)=>{
    setItemClicked(selectedNavItem);
 }
    return (
        <>
        <div className={styles.MenuBarContainer}>
            <div className={(itemClicked === 'Home') ? styles.MenuBarSelectedItem : styles.MenuBarItems} onClick={()=>handleClick('Home')}>Home</div>
            <div className={(itemClicked === 'File') ? styles.MenuBarSelectedItem : styles.MenuBarItems} onClick={()=>handleClick('File')}>File</div>
            <div className={(itemClicked === 'Insert') ? styles.MenuBarSelectedItem : styles.MenuBarItems} onClick={()=>handleClick('Insert')}>Insert</div>
            <div className={(itemClicked === 'Layout') ? styles.MenuBarSelectedItem : styles.MenuBarItems} onClick={()=>handleClick('Layout')}>Layout</div>
            <div className={(itemClicked === 'Help') ? styles.MenuBarSelectedItem : styles.MenuBarItems} onClick={()=>handleClick('Help')}>Help</div>
        </div>
        </>
    )
}