import { useEffect, useState } from "react";

import { AttachedFile, AttachedFileParameters } from "models/AttachedFile";

import ButtonIcon from "components/General/ButtonIcon/ButtonIcon";
import removeIcon from "images/buttons/remove.svg";

import styles from "components/AttachedFiles/AttachedFileListForm/AttachedFileListForm.module.scss";

interface AttachedFileListFormProps {
    noteAttachedFiles: AttachedFile[],
    sendForm: (attachedFiles: AttachedFile[]) => void;
}

export default function AttachedFileListForm({
    noteAttachedFiles,
    sendForm
}: AttachedFileListFormProps) {
    const [attachedFileList, setAttachedFileList] = useState<AttachedFile[]>(noteAttachedFiles);

    function addAttachedFile(newFile: FileList | null) {
        if (newFile === null) return;

        const keys = Object.keys(newFile)
        const updatedAttachedFiles = [...attachedFileList];
        keys.forEach(key => {
            const newAttachedFile: AttachedFile = {
                id: crypto.randomUUID(),
                file: newFile[key as any]
            }
            updatedAttachedFiles.push(newAttachedFile);
        })

        setAttachedFileList(updatedAttachedFiles)
        setTimeout(
            () => {
                window.alert(`The file is uploaded. However, due to the use of "localStorage", its data cannot be entered into the database. We apologize for the inconvenience.`)
            },
            250
        )
    }

    function removeAttachedFile(fileId: string) {
        const updatedAttachedFiles = [...attachedFileList];
        const fileIndex = updatedAttachedFiles.findIndex(attachedFile => attachedFile.id === fileId)
        if (fileIndex === -1) {
            window.alert("The file with the selected ID was not found.")
            return;
        }

        updatedAttachedFiles.splice(fileIndex, 1);
        setAttachedFileList(updatedAttachedFiles);
    }

    useEffect(() => {
        sendForm(attachedFileList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attachedFileList]);

    return <div className={styles.wrapper}>
        <div className={styles.tableWrapper}>
            <table>
                <tbody>
                    <tr>
                        <th>{AttachedFileParameters.name}</th>
                        <th>{AttachedFileParameters.type}</th>
                        <th>{AttachedFileParameters.size}</th>
                        <th>{AttachedFileParameters.dateAdded}</th>
                        <th>{AttachedFileParameters.navigation}</th>
                    </tr>

                    {attachedFileList.map(attachedFile =>
                        <tr key={attachedFile.id}>
                            <td>{attachedFile.file.name}</td>
                            <td>{attachedFile.file.type}</td>
                            <td>{attachedFile.file.size}</td>
                            <td>{new Date(attachedFile.file.lastModified).toDateString()}</td>
                            <td><ButtonIcon iconSVG={removeIcon} caption="Button for removing current file." onClick={() => removeAttachedFile(attachedFile.id)} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <input className={styles.button} type="file" multiple onChange={(e) => { addAttachedFile(e.target.files) }} />
    </div>
}