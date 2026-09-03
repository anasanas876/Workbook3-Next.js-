async function FetchProject(){
    const projects=await fetch("http://127.0.0.1:8000/showprojects")
    const response=await projects.json();

}

function DisplayProjects(){
    return(
        <div>
            <button onClick={()=>{}
            {FetchProject()}}>Fetch-Projects</>
        </div>
    )
}