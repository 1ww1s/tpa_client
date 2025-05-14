"use client"

import React, { FC, useRef, useState } from "react";
import { IInformationDisclosure } from "@/src/entities/informationDisclosure";
import classes from './disclosure.module.scss';
import { FileList } from "@/src/shared/components/file/fileList/FileList";

interface Props {
    informationDisclosure: IInformationDisclosure;
}

export const Disclosure: FC<Props> = ({ informationDisclosure }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggle = () => {
        if (contentRef.current) {
            // Если открываем, вычисляем полную высоту содержимого
            if (!isOpen) {
                const height = contentRef.current.scrollHeight;
                setContentHeight(height);
            } else {
                // Если закрываем, устанавливаем высоту 0
                setContentHeight(0);
            }
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={classes.disclosure}>
            <p 
                onMouseDown={e => e.preventDefault()} 
                onClick={toggle}
                className={classes.title}
            >
                {informationDisclosure.name}
            </p>
            <div 
                ref={contentRef}
                className={`${classes.disclosureOpen} ${isOpen ? classes.open : ''}`}
                style={{ height: `${contentHeight}px` }}
            >
                <div className={classes.list}>
                    <FileList files={informationDisclosure.files} />
                </div>
            </div>
        </div>
    );
};