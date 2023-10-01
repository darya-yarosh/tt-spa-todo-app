import { AttachedFile } from "models/AttachedFile";

import styles from "components/AttachedFiles/AttachedFileList/AttachedFileList.module.scss";

interface AttachedFileListProps {
    noteAttachedFiles: AttachedFile[],
}

export default function AttachedFileList({
    noteAttachedFiles
}: AttachedFileListProps) {
    return <div className={styles.wrapper}>
        <div className={styles.tableWrapper}>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Added</th>
                    </tr>

                    {noteAttachedFiles.map(attachedFile =>
                        <tr key={attachedFile.id}>
                            <td>{attachedFile.file.name}</td>
                            <td>{attachedFile.file.type}</td>
                            <td>{attachedFile.file.size}</td>
                            <td>{new Date(attachedFile.file.lastModified).toDateString()}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
}