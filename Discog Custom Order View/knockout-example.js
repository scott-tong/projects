// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    this.firstName = ko.observable("Bert");
    this.lastName = ko.observable("Bertington");
    this.fullName = ko.computed(function(){
        return this.firstName() + " " + this.lastName();
    }, this);
    
    this.capitalizeLastName = function(){
        var currentVal = this.lastName();
        this.lastName(currentVal.toUpperCase());
    };
    
    this.lowerCaseLastName = function(){
        var currentVal = this.lastName();
        this.lastName(currentVal .toLowerCase());
    };
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());