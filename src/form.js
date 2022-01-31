// let's create a form with a state
import {useState} from 'react';

function Form() {
    const [form,setForm] = useState({
        pregnancies: "",
        glucose: "",
        blood_pressure: "",
        skin_thickness: "",
        insulin_level:"",
        bmi:"",
        diabetes_pedigree:"",
        age:""
    });
    
    const [loading,setLoading] = useState(false);
    const [result,setResult] = useState("");

    const handleSubmit=(event)=>{
        event.preventDefault();
        const form_data = new FormData();
        form_data.append('1', form.pregnancies);
        form_data.append('2', form.glucose);
        form_data.append('3', form.blood_pressure);
        form_data.append('4', form.skin_thickness);
        form_data.append('5',form.insulin_level);
        form_data.append('6', form.bmi);
        form_data.append('7', form.diabetes_pedigree);
        form_data.append('8', form.age);
        setLoading(true);
        fetch('https://flas-app-v69.herokuapp.com/predict', {
            method: 'POST',
            body: form_data
        })
            .then(response => response.text())
            .then(html =>
                {
                    setResult(html);
                    setLoading(false)
                })
            
    };
    const onChange=(event)=>{
       
        const name = event.target.name;
        const value = event.target.value;

        console.log(`event.target.name:${name}, event.target.value:${value}`);
        //save the input 
        setForm({...form,[name]:value});

    };
    const handleClear=()=>{
        setForm({
            pregnancies: "",
        glucose: "",
        blood_pressure: "",
        skin_thickness: "",
        insulin_level:"",
        bmi:"",
        diabetes_pedigree:"",
        age:""
        });
        setResult("");
    }
    return(
        <form onSubmit={handleSubmit}>
            <h4>Diabetes Prediction Model</h4>
            <p>example to predict probability of diabetes</p>
            <input type="number" name="pregnancies" value={form.pregnancies} onChange={onChange} placeholder='number of pregnancies' required/>
            <input type="number" name="glucose" value={form.glucose} onChange={onChange} placeholder='Glucose level in sugar' required/>
            <input type="number" name="blood_pressure" value={form.blood_pressure} onChange={onChange} placeholder='Blood Pressure' required/>
            <input type="number" name="skin_thickness" value={form.skin_thickness} onChange={onChange} placeholder='skin thickness' required/>
            <input type="number" name="insulin_level" value={form.insulin_level} onChange={onChange} placeholder='Insulin Level' required/>
            <input type="number" name="bmi" value={form.bmi} onChange={onChange} placeholder='BMI' required/>
            <input type="number" name="diabetes_pedigree" value={form.diabetes_pedigree} onChange={onChange} placeholder='Pedigree' required/>
            <input type="number" name="age" value={form.age} onChange={onChange} placeholder='age' required/>

            <button type="submit" disabled={loading}>{loading ? "predicting result...": "Submit"}</button>
            {result && <span onClick={handleClear}>Clear Prediction</span>}
            {result && <div dangerouslySetInnerHTML={{__html: result}} className='result'/>}
        </form>
    )
}

export default Form;