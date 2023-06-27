import { MongoClient } from "mongodb"

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("AH20231CP1")

client.connect()
  .then(function () {
    console.log("Conectado")
    // const collectionProjects = db.collection("Projects");
    // const collectionClient = db.collection("Client");
    const collectionTag = db.collection("Tags");
    const collectionState = db.collection("States");

    // db projects
    // collectionProjects.insertOne(
    //   {
    //     name: "Goaly",
    //     description: "Una app para completar goals con tus amigos!",
    //     comment: "Hacerla rapido que es para el lunes",
    //     state: "En Progreso",
    //     user: ["Laureano Zalazar"],
    //     tags: ["React", "CSS", "VITE"]
    //   })
    // collectionProjects.insertOne({
    //   name: "Desarrollo de Sitio Web Corporativo",
    //   description: "Desarrollo de un sitio web corporativo para una empresa de tecnología",
    //   comment: "El diseño debe ser moderno y responsive",
    //   state: "En Progreso",
    //   user: ["Laureano Zalazar", "María García"],
    //   tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    // });

    // collectionProjects.insertOne({
    //   name: "Aplicación de Gestión de Tareas",
    //   description: "Desarrollo de una aplicación para gestionar tareas y proyectos",
    //   comment: "Se requiere integración con API externas y sistema de notificaciones",
    //   state: "Pendiente",
    //   user: ["Juan Pérez", "Ana Rodríguez"],
    //   tags: ["React", "Redux", "Firebase", "REST API"],
    // });

    // collectionProjects.insertOne({
    //   name: "Rediseño de Tienda en Línea",
    //   description: "Rediseño de una tienda en línea para mejorar la experiencia de usuario",
    //   comment: "Se deben implementar nuevas funcionalidades y mejorar el rendimiento",
    //   state: "Hecho",
    //   user: ["Carlos Gómez", "Laura Fernández"],
    //   tags: ["Vue.js", "Vuex", "Tailwind CSS", "GraphQL"],
    // });

    // collectionProjects.insertOne({
    //   name: "App de Recetas de Cocina",
    //   description: "Desarrollo de una aplicación móvil para descubrir y compartir recetas de cocina",
    //   comment: "Se requiere integración con redes sociales y sistema de búsqueda avanzada",
    //   state: "En Progreso",
    //   user: ["Martín López", "Sofía Ramírez"],
    //   tags: ["React Native", "Expo", "MongoDB", "AWS"],
    // });
    collectionTag.insertOne(
      {
        name: "REACT",
        color: "#FFC107",
      });
    collectionTag.insertOne(
      {
        name: "Firebase",
        color: "#4CAF50",
      });
    collectionTag.insertOne(
      {
        name: "MongoDB",
        color: "#2196F3",
      });
    collectionTag.insertOne(
      {
        name: "Expo",
        color: "#E91E63",
      });
    collectionTag.insertOne(
      {
        name: "AWS",
        color: "#9C27B0",
      });
    collectionTag.insertOne(
      {
        name: "React Native",
        color: "#FFC107",
      });
    collectionTag.insertOne(
      {
        name: "Vue.js",
        color: "#4CAF50",
      });
    collectionTag.insertOne(
      {
        name: "Tailwind CSS",
        color: "#2196F3",
      });
    collectionTag.insertOne(
      {
        name: "Vuex",
        color: "#E91E63",
      });
    collectionTag.insertOne(
      {
        name: "REST API",
        color: "#9C27B0",
      });

    // states
    collectionState.insertOne(
      {
        name: "Pendiente",
      });
    collectionState.insertOne(
      {
        name: "En Progreso",
      });
    collectionState.insertOne(
      {
        name: "Hecho",
      });

    //   db users
    // collectionClient.insertOne(
    //   {
    //     nombre: "Laureano",
    //     email: "laureano@zalazar.com",
    //     descripcion: "Estudiante de la Escuela Da Vinci y tiene intenciones de aprobar la materia Aplicaciones Hibridas",
    //     proyectos: ["Desarrollo de Sitio Web Corporativo", "Goaly"]
    //   })
    // collectionClient.insertOne(
    //   {
    //     nombre: "Brian",
    //     email: "brian@lara.com",
    //     descripcion: "Profe Aplicaciones Hibridas",
    //     proyectos: ["App de Recetas de Cocina", "Rediseño de Tienda en Línea"]
    //   })

  })
  .catch(function () {
    console.log("Conexión fallida")
  })