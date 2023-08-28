import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';

const PopularEbook = () => {
    const navigate = useNavigate();

    const board = () :string=> {
        return(
            `<div>
                <h1>test</h1>
                <p>xptmxm</p>
            </div>`
        )
           
        
    }

    return (
        <>
            <div>
                <Button label="Ebook을 읽고 싶다면??" style={{ width: '49%', height: '13.5rem' }} onClick={() => navigate('/EbookList')}/>
                <Button label="자유롭게 주제를 생성하고 토론하고 싶다면??" style={{ width: '49%', height: '13.5rem',marginLeft:'1%' }} severity="success" onClick={() => navigate('/smallTalkList')}/>
            </div>
            <div style={{marginTop:'1rem'}}>
                <Button label="즐거운 게시글을 보고 싶다면??" style={{ width: '49%', height: '13.5rem' }} severity="info" onClick={() => navigate('/BoardList')}/>
                <Button label="운영자에게 질문이 있다면??" style={{ width: '49%', height: '13.5rem',marginLeft:'1%'  }} severity="secondary" onClick={() => {}}/>
            </div>
           
        </>
    )
}

export default PopularEbook;