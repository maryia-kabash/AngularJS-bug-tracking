/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('bugs').service('BoardDataFactory', function () {

  return {
    kanban: {
      "name": "Kanban Board #2",
      "columns": [
        {"name": "Ideas",
         "bugs": [
             {"name": "Come up with a POC for new Project"},
             {"name": "Design new framework for reporting module"}
            ]
        },
        {"name": "Development", "bugs": [
          {"name": "Explore new IDE for Development",
            "summary": "Testing Card Details"},
          {"name": "Get new resource for new Project",
            "summary": "Testing Card Details"}
        ]},
        {"name": "Testing", "bugs": [
          {"name": "Develop ui for tracker module",
            "summary": "Testing Card Details"},
          {"name": "Develop backend for plan module",
            "summary": "Testing Card Details"}
        ]},
        {"name": "Done", "bugs": [
          {"name": "Test user module",
            "summary": "Testing Card Details"},
          {"name": "End to End Testing for user group module",
            "summary": "Testing Card Details"},
          {"name": "CI for user module",
            "summary": "Testing Card Details"}
        ]}
      ]
    }
  };
});
