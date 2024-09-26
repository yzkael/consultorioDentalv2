//Va a recibir un array .config que tendra los inputs de cada tabla
//Debo ver la forma de poder utilizar cada FormBase dentro de un useForm
//Utilizando useFormContext? Haciendo que cada {...register(`${input[x]}`)}? 
//Maybe 
//Para asegurarme al 100% de que 
//Y como fuck hago los checks?????? Como revisare la uniqueness de los valores que se tenga que hacer?????
//Deberia solamente crear un partesita del form?
//Tal vez deberia reestructurar mi idea y solamente crear un InputBase asi matendria limpia mi Form... Pero.... entonces mi FormBase deberia ser solamente.... Un style? es decir seria una form useContext() y un style? Valdria la pena?
//Creo que me complicaria la vida haciendo una FormBase y un monton de multisteps... Aunque y si hago el form formprovider y los styles,divs y luego en el solamente se encontrarian los MultiSteps? Probaremos y si lo hago solamente un estilo en tailwind?



const FormBase = () => {
    return (
        <div>

        </div>
    )
}

export default FormBase
