/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('bugs').service('BoardDataFactory', function () {

  return {
    kanban: {
      "name": "Kanban Board",
      "numberOfColumns": 4,
      "columns": [
        {"name": "Ideas", "cards": [
            {"name": "Come up with a POC for new Project"},
            {"name": "Design new framework for reporting module"}
        ]},
        {"name": "Development", "cards": [
          {"name": "Explore new IDE for Development",
            "details": "Testing Card Details"},
          {"name": "Get new resource for new Project",
            "details": "Testing Card Details"}
        ]},
        {"name": "Testing", "cards": [
          {"name": "Develop ui for tracker module",
            "details": "Testing Card Details"},
          {"name": "Develop backend for plan module",
            "details": "Testing Card Details"}
        ]},
        {"name": "Done", "cards": [
          {"name": "Test user module",
            "details": "Testing Card Details"},
          {"name": "End to End Testing for user group module",
            "details": "Testing Card Details"},
          {"name": "CI for user module",
            "details": "Testing Card Details"}
        ]}
      ]
    }
  };
});
