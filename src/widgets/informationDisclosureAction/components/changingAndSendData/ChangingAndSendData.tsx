import { FileList, IInformationDisclosure, informationDisclosureService } from "@/src/entities/informationDisclosure";
import { AddImgList } from "@/src/features/addImgList";
import { ChangingInformationDisclosure } from "@/src/features/changingInformationDisclosure";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { FC } from "react";

interface Props {
    informationDisclosure: IInformationDisclosure;
    setInformationDisclosure: (informationDisclosure: IInformationDisclosure) => void;
    action: 'create' | 'update' | 'delete';    
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    title: string;
}

export const ChangingAndSendData: FC<Props> = (
    {informationDisclosure, setInformationDisclosure, action, isLoading, setIsLoading, selectedWidget, setSelectedWidget, title}) => {

    const setFiles = (files: IInformationDisclosure['files']) => {
        setInformationDisclosure({...informationDisclosure, files: files})
    }

    const deleteItem = (ind: number) => {
        const clone: IInformationDisclosure['files'] = JSON.parse(JSON.stringify(informationDisclosure.files))
        clone.splice(ind, 1)
        setFiles(clone)
    }

    const handleSubmit = async () => {
            const formData = new FormData();
            informationDisclosure.files.forEach(file => {
                if(file.file){
                    formData.append("pdfFiles", file.file);
                    formData.append("name", file.name);
                }
            })
            formData.append("data", JSON.stringify({...informationDisclosure, files: informationDisclosure.files.map(file => ({id: file.id, name: file.name}))}));
            return action === 'create' ? await informationDisclosureService.create(formData) : await informationDisclosureService.update(formData) // заменить update
        };
    
    return (
        <div>
            <h3>{title}</h3>
            <ChangingInformationDisclosure 
                informationDisclosure={informationDisclosure}
                setInformationDisclosure={setInformationDisclosure}
                uploadFile={
                    <AddImgList 
                        reverse={true} 
                        setImages={setFiles} 
                        images={informationDisclosure.files} 
                        accept=".pdf" 
                    />
                }
            >
                <FileList files={informationDisclosure.files} onDeleteFile={deleteItem} />
            </ChangingInformationDisclosure>
            <hr />
            <SendDetailedData 
                action={action}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                sendData={handleSubmit}
                onEnd={() => setSelectedWidget(selectedWidget + 1)} 
            />
        </div>
    )
}