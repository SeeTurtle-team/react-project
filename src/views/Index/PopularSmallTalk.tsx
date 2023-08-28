import { Fieldset } from "primereact/fieldset";

const legendTemplate = (
    <div className="flex align-items-center text-primary">
        <span className="pi pi-user mr-2"></span>
        <span className="font-bold text-lg">Popular Small Talk!!</span>
    </div>
);


const PopularSmallTalk = () => {
    
    return (
        <div>
            <Fieldset legend={legendTemplate} style={{display:'inline-flex'}}>
            </Fieldset>
        </div>
    )
}

export default PopularSmallTalk;