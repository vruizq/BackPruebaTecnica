import fs from "fs/promises";
import path from "path";

const dataFilePath = path.resolve("data.json");
// Leer datos del archivo JSON
const readDataFromFile = async () => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log("Error al leer el archivo:", err);
    return [];
  }
};

// Escribir datos en el archivo JSON
const writeDataToFile = async (data) => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.log("Error al escribir en el archivo:", err);
  }
};

export const getCrud = async (req, res) => {
  const data = await readDataFromFile();
  res.json(data);
};
export const getCrudById = async (req, res) => {
  const id = req.params.Id;
  res.json({ prueba: "GET " + id });
};
export const updateById = async (req, res) => {
  const id = req.params.Id;
  const {
    presupuesto,
    unidad,
    tipodebienoservicio,
    cantidad,
    valorUnitario,
    valorTotal,
    fechadeAdquisicion,
    proveedor,
    documentacion,
  } = req.body;

  // Mostrar por consola los parámetros que llegan al endpoint
  console.log("Datos recibidos en el endpoint PUT:", {
    id,
    presupuesto,
    unidad,
    tipodebienoservicio,
    cantidad,
    valorUnitario,
    valorTotal,
    fechadeAdquisicion,
    proveedor,
    documentacion,
  });

  const data = await readDataFromFile();
  const index = data.findIndex((entry) => entry.id === id);

  if (index !== -1) {
    // Actualizar el objeto con el nuevo presupuesto
    data[index].presupuesto = presupuesto;
    data[index].unidad = unidad;
    data[index].tipodebienoservicio = tipodebienoservicio;
    data[index].cantidad = cantidad;
    data[index].valorUnitario = valorUnitario;
    data[index].valorTotal = valorTotal;
    data[index].fechadeAdquisicion = fechadeAdquisicion;
    data[index].proveedor = proveedor;
    data[index].documentacion = documentacion;

    await writeDataToFile(data);
    res.json(data[index]); // Devolver el objeto actualizado
  } else {
    res.status(404).json({ error: "No encontrado" });
  }
};
export const deleteById = async (req, res) => {
    const id = req.params.Id;
    const {
      estado,
    } = req.body;
  
    // Mostrar por consola los parámetros que llegan al endpoint
 
  
    const data = await readDataFromFile();
    const index = data.findIndex((entry) => entry.id === id);
  
    if (index !== -1) {
      // Actualizar el objeto con el nuevo presupuesto
      if(data[index].estado ==0){
        data[index].estado = 1; 
      }      else{
        data[index].estado = 0;
      }
      
  
  
      await writeDataToFile(data);
      res.json(data[index]); // Devolver el objeto actualizado
    } else {
      res.status(404).json({ error: "No encontrado" });
    }

};

export const setCrud = async (req, res) => {
  console.log("Datos recibidos en el endpoint:", req.body);
  const {
    presupuesto,
    unidad,
    tipodebienoservicio,
    cantidad,
    valorUnitario,
    valorTotal,
    fechadeAdquisicion,
    proveedor,
    documentacion,
    estado,
  } = req.body;
  console.log(presupuesto);
  const data = await readDataFromFile();
  const newItem = {
    id: Date.now().toString(), // Generar un ID único
    presupuesto,
    unidad,
    tipodebienoservicio,
    cantidad,
    valorUnitario,
    valorTotal,
    fechadeAdquisicion,
    proveedor,
    documentacion,
    estado,
  };
  data.push(newItem);
  await writeDataToFile(data);
  res.status(201).json(newItem);
};
