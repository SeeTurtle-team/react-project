import { Button } from 'primereact/button';

const PopularEbook = () => {
    return (
        <>
            <div>
                <Button label="Secondary" style={{ width: '49%', height: '13.5rem' }} />
                <Button label="Success" style={{ width: '49%', height: '13.5rem',marginLeft:'1%' }} severity="success" />
            </div>
            <div style={{marginTop:'1rem'}}>
                <Button label="Info" style={{ width: '49%', height: '13.5rem' }} severity="info" />
                <Button label="Warning" style={{ width: '49%', height: '13.5rem',marginLeft:'1%'  }} severity="warning" />
            </div>
           
        </>
    )
}

export default PopularEbook;