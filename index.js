class MoodEntry{
    constructor(mood,note){
        this.mood = mood;
        this.note=note;
        this.date= new Date().toLocaleDateString();
    }
}
let moodLog =[];
function addMood() {
    try{
        const mood = document.getElementById("mood").value;
        const note = document.getElementById("note").value;
        if(!mood || !note)
            throw "Please fill in all fields.";
            const entry = new MoodEntry(mood, note);
            moodLog.push(entry);
            saveMoods();
            renderMoods();
            document.getElementById("note")

        } catch(e){
            alert(e);
        }
    }
function renderMoods() {
    const container = document.getElementById("log");
    container.innerHTML = "";
    moodLog.forEach((entry, index) => {
        const div = document.createElement("div");
        div.innerHTML = ` <b>${entry.date}</b><br> Mood: ${entry.mood}<br>Note: ${entry.note}<hr>`;
        container.appendChild(div);
    });

}
function saveMoods(){
    localStorage.setItem("moods",JSON.stringify(moodLog));

}
window.onload = function() {
    const saved = localStorage.getItem("moods");
    if(saved) moodLog = JSON.parse(saved);
    renderMoods();
}
function renderMoods() {
    const container = document.getElementById("log");
    container.innerHTML = "";
    moodLog.forEach((entry, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <b>${entry.date}</b><br>
            Mood: ${entry.mood}<br>
            Note: ${entry.note}
            <button class="delete-btn" onclick="deleteMood(${index})">Delete</button>
            <hr>`;
        container.appendChild(div);
    });
}

function deleteMood(index) {
    moodLog.splice(index, 1);
    saveMoods();
    renderMoods();
}
