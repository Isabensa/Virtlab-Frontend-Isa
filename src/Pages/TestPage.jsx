const TestPage = () => {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-pink-300">¡Layout funcionando!</h1>
        <div className="bg-pink-300 text-black px-6 py-4 rounded shadow-lg">
          Este componente está dentro del &lt;Outlet /&gt;
        </div>
      </div>
    )
  }
  
  export default TestPage;
  