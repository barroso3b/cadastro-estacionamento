interface veiculo{
   nome: string;
   placa: string;
   entrada: Date | string ;

}

(function()  {
   const $ = (query: string):HTMLInputElement | null => document.querySelector(query);

     function calcTempo(mil: number){
        const min = Math.floor(mil  / 60000);
        const sec = Math.floor((mil % 60000) / 1000);

        return '${min}m e ${sec}s';
     }



   function patio(){
      function ler(): veiculo [] {
          return localStorage.patio ? JSON.parse(localStorage.patio) :[];
      }

      function salvar (veiculo: []){
         localStorage.setItem("patio", JSON.stringify(veiculo));

      }


      function adicionar(veiculo: veiculo, salva?:boolean) {
         const row = document.createElement("tr");

         row.innerHTML= `
            <td>${veiculo.nome}</td>
            <td>${veiculo.placa}</td>
            <td>${veiculo.entrada}</td>
            <td>
              <button class"delete" data-placa="${veiculo.placa}">x</button>
            </td>
            `;

          row.querySelector(".delete")?.addEventListener("click", function(){
              remover(this.dataset.placa);

          });


            $("#patio")?.appendChild(row);

            if (salva) salvar([...ler(), veiculo]);           
      }
      function remover (placa: string)  {

       const {entrada, nome} = ler().find(viculo => veiculo.placa === placa);
      }

      function render (){
         $("#patio")!.innerHTML="";
         const patio =ler();
         if (patio.length){
               patio.forEach((veiculo) => adicionar(veiculo));

               const tempo = calcTempo(
                  new Date().getTime() -  new date(entrada).getTime()
                  );
            
         if (
            !confirm('o veiculo ${nome} permaneceu por ${tempo}. deseja encerrar?')
         )  
         
          return;
          salvar(ler().filter((veiculo) => veiculo.placa !== placa));
           render();
         }

      }

      return{ ler, adicionar, remover, salvar, render };
   }

   patio().render();
 $("#cadastar")?.addEventListener("click", () =>{
    const nome= $("#nome")?.value;
    const placa= $("#placa")?.value;

    if (!nome || !placa){
        alert("Os Campos nome e placa sâo obrigatorios");
        return;
    }

    patio().adicionar({ nome, placa, entrada : new Date().toISOString }, true);
 });
})();