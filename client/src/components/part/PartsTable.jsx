import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import API from '../../API';

const PartsTable = ({ setShowFormUpdate, setPartId, searchTerm, parts }) => {
  const [partList, setPartList] = useState(parts)

  // Search for parts
  useEffect(() => {
    if (searchTerm === '') {
      setPartList(parts);
      return;
    }
    setPartList(parts.filter(part => {
      if (part.part_number.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      } else if (part.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      } 
      return false;
    }))
  }, [searchTerm, parts]);

  // Mutations
  const queryClient = useQueryClient();
  const updatePart = useMutation(part => API.updatePart(part), {
    onSuccess: () => {
      queryClient.invalidateQueries('parts')
      console.log("Part updated!")
    }
  })
  const deletePart = useMutation(id => API.deletePart(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('parts')
      console.log("Part deleted!")
    }
  })

  // Event Handlers
  const editHandler = async part => await updatePart.mutate(part);
  const viewHandler = e => {
    e.preventDefault();
    setPartId(parseInt(e.target.dataset._id));
    setShowFormUpdate(true);
  };
  const deleteHandler = async e => {
    e.preventDefault();
    await deletePart.mutate(parseInt(e.target.dataset._id))
  }

  return (
    <div className="mt-5">
      <h3 className="float-start">Inventory Search Results:</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Part #</th>
            <th scope="col">Description</th>
            <th scope="col" className="text-center">Purchase $</th>
            <th scope="col" className="text-center">Sale $</th>
            <th scope="col" className="text-center">In Stock</th>
            <th scope="col" className="text-center">Change stock</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {partList.map(part => (
            <tr key={part._id}>
              <td>{part.part_number}</td>
              <td>{part.description}</td>
              <td className="text-center text-danger">{part.purchase_price}</td>
              <td className="text-center text-success">{part.sale_price}</td>
              <td className="text-center">{part.stock}</td>
              <td className="d-flex justify-content-center">
                <button
                  className="btn btn-secondary"
                  data-id={part._id}
                  onClick={() => editHandler({ ...part, stock: part.stock + 1 })}
                  >+
                </button>
                <button
                  className="btn btn-secondary ms-4"
                  data-id={part._id}
                  onClick={() => editHandler({ ...part, stock: part.stock - 1 })}
                  >-
                </button>
              </td>
              <td>
                <div className="float-end">
                  <button
                    className="btn btn-warning"
                    data-id={part._id}
                    onClick={viewHandler}
                    >edit
                  </button>
                  <button
                    className="btn btn-danger ms-4"
                    data-id={part._id}
                    onClick={deleteHandler}
                    >X
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartsTable;