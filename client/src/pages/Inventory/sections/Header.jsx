import { useQueryClient } from 'react-query';

const Header = () => {
    const qc = useQueryClient();

    return (
        <div className={"main-header"}>
            <h1 onClick={() => {
                qc.setQueryData('view', 'default');
            }}>Inventory</h1>

            <div className={"button-area"}>
                <p className={"btn"} onClick={() => {
                    qc.refetchQueries('parts');
                    qc.setQueryData('view', 'default');
                }}>View All</p>

                <p className={"btn"} onClick={() => {
                    qc.setQueryData('view', 'restock');
                }}>View Low Stock</p>

                <p className={"btn"} onClick={() => {
                    qc.setQueryData('submissionType', 'new');
                    qc.setQueryData('view', 'newPart');
                }}>Create New</p>
            </div>
        </div>
    )
}

export default Header;