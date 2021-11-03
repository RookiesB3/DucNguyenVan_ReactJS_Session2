import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Post.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useParams } from "react-router-dom";



const ORDER_OPTIONS = {
  NONE: "none",
  ASC: "asc",
  DES: "des",
};
const Post = () => {
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortTitleOrder, setSortTitleOrder] = useState(ORDER_OPTIONS.NONE);
  const [selectItem, setSelectItem] = useState(null);
  
  let { id } = useParams();
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then((res) => {
      setList(res.data);
      console.log(res.data);
    });
  }, []);

  const listFiltered = list.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const getListSorted = () => {
    if (sortTitleOrder === ORDER_OPTIONS.NONE) return listFiltered;
    const order = sortTitleOrder === ORDER_OPTIONS.ASC ? 1 : -1;
    return listFiltered.sort((list1, list2) => {
      if (list1.title.toLowerCase() < list2.title.toLowerCase())
        return -1 * order;
      if (list1.title.toLowerCase() > list2.title.toLowerCase())
        return 1 * order;
      return 0;
    });
  };
  const handleOnClick = () => {
    if (sortTitleOrder === ORDER_OPTIONS.NONE)
      return setSortTitleOrder(ORDER_OPTIONS.ASC);
    if (sortTitleOrder === ORDER_OPTIONS.ASC)
      return setSortTitleOrder(ORDER_OPTIONS.DES);
    if (sortTitleOrder === ORDER_OPTIONS.DES)
      return setSortTitleOrder(ORDER_OPTIONS.NONE);
  };
  const listSorted = getListSorted();
  // const remove = () => {
  //   const newList = listSorted.splice(,1);
  // };
  console.log({ selectItem });
  return (
    <div>
      <Container>
        <div className="input-control">
          <input
            className="list-input"
            value={searchText}
            onChange={(evt) => setSearchText(evt.target.value)}
            type="text"
            placeholder="Search by title"
          />
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>

              <th onClick={handleOnClick}>Title -- Sort({sortTitleOrder}) </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listSorted.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.title}</td>
                <td>
                  <Button variant="secondary" className="detail-btn">
                    <Link to={`posts/${id}`}>View details</Link>
                  </Button>
                  {/* onClick={remove} */}
                  <Button variant="danger">Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Post;
