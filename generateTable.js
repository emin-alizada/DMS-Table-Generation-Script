import fs from 'fs';

const GenerateTable = (tableName, columns, numberOfRows) => {
    // console.log(`Generating table ${tableName} with ${columns.length} columns and ${numberOfRows} rows`);

    const dropTable = `DROP TABLE ${tableName};`;
    const createTable = `CREATE TABLE ${tableName} (
${columns.map(column => `${column.name} ${column.type}`).join(',\n')}
);`;

    const inserts = [];

    const valuesOfColumn = (column, i) => {
        if (column.type === "int") {
            return column.value(i);
        } else {
            return `'${column.value()}'`;
        }
    };


    for (let i = 1; i <= numberOfRows; i++) {
        const insertStatement = `INSERT INTO ${tableName} 
(${columns.map(column => `${column.name}`).join(', ')}) 
VALUES (${columns.map((column) => valuesOfColumn(column, i)).join(', ')});
        `;

        inserts.push(insertStatement);
    }

    const sql = `${dropTable}\n\n${createTable}\n\n${inserts.join('\n')}`;

    try {
        fs.writeFileSync('script.sql', sql)
    } catch (err) {
        console.error(err)
    }
}

export default GenerateTable;