const express = require("express");
const {
  getAllArticles: getAllArticlesService,
} = require("../services/articles.services");

const getAllArticles = (request, response) => {
  getAllArticlesService().then((articles) => {
    response.status(200).send({ articles });
  });
};

module.exports = { getAllArticles };
