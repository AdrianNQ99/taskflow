const Dasboard = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Bienvenido a tu panel de control. Aquí puedes gestionar tus proyectos
          y tareas.
        </p>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Proyectos Recientes
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Aquí puedes ver tus proyectos recientes y acceder a ellos rápidamente.
        </p>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tareas Pendientes{" "}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Aquí puedes ver tus tareas pendientes y gestionarlas fácilmente.
        </p>
        
      </div>
    </>
  );
};

export default Dasboard;
