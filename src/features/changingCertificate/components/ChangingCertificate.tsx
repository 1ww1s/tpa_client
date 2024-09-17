import { ICertificate } from "@/src/entities/certificate";
import { FC } from "react";
import classes from './changingCertificate.module.scss'
import { MyInput } from "@/src/shared/components/myInput/MyInput";
import { useCertificateActions } from "@/src/entities/certificate";

interface ChangingCertificateProps {
    certificate: ICertificate;
    setCertificate: (certificate: ICertificate) => void;
    uploadImage: React.ReactElement;
}

export const ChangingCertificate: FC<ChangingCertificateProps> = ({certificate, setCertificate, uploadImage}) => {

    const {setName, setEndDate} = useCertificateActions(certificate, setCertificate)

    return (
        <div className={classes.changingCertificate}>
            <p data-title="title">Введите название сертификата</p>
            <MyInput 
                value={certificate.name} 
                setValue={setName} 
                type='text' 
                placeholder='Российский речной регистр' 
                required
            />
            <p data-title="title">Введите дату окончания действия сертификата</p>
            <MyInput 
                value={certificate.endDate} 
                setValue={setEndDate} 
                type='date'
                placeholder="Описание" 
                required
            />
            <p data-title="title">Фотография</p>
            {uploadImage}
        </div>
    )
}