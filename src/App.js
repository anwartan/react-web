import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/button";
import Card from "./components/card";
import Form from "./components/form";
import Table from "./components/table";
import TextField from "./components/text-field";
import { getInitialData, showFormattedDate } from "./utils";

function App() {
  const [title, setTitle] = useState("");
  const [allNote, setAllNotes] = useState(getInitialData());
  const [notes, setNotes] = useState([]);
  const initialForm = {
    title: "",
    body: "",
    archived: false,
  };
  const maxCharacter = 50;
  const [form, setForm] = useState(initialForm);
  const columnsTable = [
    {
      id: "title",
      name: "Title",
    },
    {
      id: "body",
      name: "Body",
    },
    {
      id: "createdAt",
      name: "Created At",
      custom: (item) => {
        return <>{showFormattedDate(item.createdAt)}</>;
      },
    },
    {
      id: "action",
      name: "Action",
      custom: (item) => {
        return (
          <>
            <Button
              label={"Delete"}
              type="danger"
              onClick={() => onButtonDelete(item.id)}
            ></Button>
            <Button
              label={"Archive"}
              onClick={() => onButtonArchive(item.id)}
            ></Button>
          </>
        );
      },
    },
  ];

  const removeColumnsTable = [
    {
      id: "title",
      name: "Title",
    },
    {
      id: "body",
      name: "Body",
    },
    {
      id: "createdAt",
      name: "Created At",
      custom: (item) => {
        return <>{showFormattedDate(item.createdAt)}</>;
      },
    },
    {
      id: "action",
      name: "Action",
      custom: (item) => {
        return (
          <>
            <Button
              label={"Remove"}
              onClick={() => onButtonRemove(item.id)}
              type="danger"
            ></Button>
          </>
        );
      },
    },
  ];

  const onButtonSubmit = (e) => {
    e.preventDefault();
    if (form.title === null && form.title === "") {
      return false;
    }
    if (form.body === null && form.body === "") {
      return false;
    }

    const tmp = [...allNote];
    const newForm = {
      ...form,
      createdAt: new Date(),
      id: new Date().getTime(),
    };
    tmp.push(newForm);
    setAllNotes(tmp);
  };
  const onButtonArchive = (id) => {
    const tmp = [...allNote];
    tmp.forEach(function (item) {
      if (item.id === id) {
        item.archived = true;
      }
    });
    setAllNotes(tmp);
    return true;
  };

  const onButtonRemove = (id) => {
    const tmp = [...allNote];
    tmp.forEach(function (item) {
      if (item.id === id) {
        item.archived = false;
      }
    });
    setAllNotes(tmp);
    return true;
  };

  const onButtonDelete = (id) => {
    let tmp = [...allNote];
    setAllNotes(tmp.filter((item) => item.id !== id));
    return true;
  };
  const onSetForm = (value, field) => {
    setForm({ ...form, [field]: value });
  };
  const onReset = () => {
    setForm(initialForm);
  };

  useEffect(() => {
    const tmp = allNote.filter((item) =>
      item.title.toLowerCase().includes(title)
    );
    setNotes(tmp);
  }, [title, allNote]);

  return (
    <div>
      <main>
        <div className="container" id="main">
          <Card id={"add"} title={"Add Note"}>
            <Form id={"formBook"} onSubmit={onButtonSubmit}>
              <TextField id={"id"} type="hidden"></TextField>

              <TextField
                value={form.title}
                onChange={(e) => onSetForm(e.target.value, "title")}
                label={"Title"}
                id={"title"}
                placeholder={"title"}
                type="text"
                helperText={`${
                  maxCharacter - form.title.length
                } Character Left`}
                maxLength={maxCharacter}
              ></TextField>
              <TextField
                value={form.body}
                onChange={(e) => onSetForm(e.target.value, "body")}
                label={"Body"}
                id={"body"}
                placeholder={"body"}
                type="text"
              ></TextField>

              <TextField
                value={form.archived}
                onChange={(e) => onSetForm(e.target.checked, "archived")}
                label={"Archived"}
                id={"archived"}
                type="checkbox"
              ></TextField>

              <div className="form-control">
                <Button label={"Save"}></Button>
                <Button
                  onClick={onReset}
                  type={"danger"}
                  label={"Clear"}
                ></Button>
              </div>
            </Form>
          </Card>
          <Card id="search" title={"Cari Note"}>
            <TextField
              id={"searchTitle"}
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Input Title Note"
            ></TextField>
          </Card>
          <Card
            title={"Notes"}
            id="noteCard"
            footer={`Total data :${
              notes.filter((item) => item.archived === false).length
            }`}
          >
            <Table
              id={"noteTable"}
              columns={columnsTable}
              data={notes.filter((item) => item.archived === false)}
            ></Table>
          </Card>
          <Card
            title={"Notes"}
            id="archivedCard"
            footer={`Total data :${
              notes.filter((item) => item.archived === true).length
            }`}
          >
            <Table
              id={"archivedTable"}
              columns={removeColumnsTable}
              data={notes.filter((item) => item.archived === true)}
            ></Table>
          </Card>
        </div>
      </main>
      <footer>&copy; 2022, Movie Catalogue created by Anwar Tanjung</footer>
    </div>
  );
}

export default App;
