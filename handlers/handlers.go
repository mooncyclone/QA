package handlers

import (
	"github.com/gorilla/mux"
)

// Router register necessary routes and returns an instance of a router.
func Router(string, string, string) *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/home", home).Methods("GET")
	return r
}
