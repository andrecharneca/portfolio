package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

func getProfile(w http.ResponseWriter, r *http.Request) {
	file, err := os.Open("backend/profile.json")
	if err != nil {
		http.Error(w, "Could not open profile file", 500)
		log.Println("Error opening backend/profile.json:", err)
		return
	}
	defer file.Close()

	bytes, err := io.ReadAll(file)
	if err != nil {
		http.Error(w, "Could not read profile file", 500)
		log.Println("Error reading backend/profile.json:", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Write(bytes)
	log.Println("Responded to /api/profile with backend/profile.json content")
}

func getCV(w http.ResponseWriter, r *http.Request) {
	file, err := os.Open("backend/cv.json")
	if err != nil {
		http.Error(w, "Could not open CV file", 500)
		log.Println("Error opening cv.json:", err)
		return
	}
	defer file.Close()

	bytes, err := io.ReadAll(file)
	if err != nil {
		http.Error(w, "Could not read CV file", 500)
		log.Println("Error reading cv.json:", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Write(bytes)
	log.Println("Responded to /api/cv with backend/cv.json content")
}

func main() {
	http.HandleFunc("/api/profile", getProfile)
	http.HandleFunc("/api/cv", getCV)

	log.Println("🚀 Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
