import generateTable from "./generateTable.js";
import casual from "casual";

const tableName = 'testTable';

const columnTypes = {
    int: "int",
    string: "VARCHAR(255)",
}

const columns = [
    {
        name: 'id',
        type: columnTypes.int,
        value: (i) => i,
    },
    {
        name: 'randomWord',
        type: columnTypes.string,
        value: () => casual.word,
    },
    {
        name: 'anotherRandomWord',
        type: columnTypes.string,
        value: () => casual.word,
    },
    {
        name: 'fixedWord',
        type: columnTypes.string,
        value: () => "fixedWord",
    },
    {
        name: 'randomNumber',
        type: columnTypes.int,
        value: () => casual.integer(1, 100000),
    },
]

const numberOfRows = 1000000;

// Will create a sql file with script to create a table with the given columns
generateTable(tableName, columns, numberOfRows);