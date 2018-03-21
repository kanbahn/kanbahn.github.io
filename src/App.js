import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div class="root-container">
        <h1 class="text-box">Project name</h1>

        <div className="App">
          <div class="feature-lane">
            <h1 class="text-box">Feature 1</h1>
            <div class="flex-container">

              <div class="flex-column double">
                <p class="column-header">Todo</p>
                <div class="flex-card-wrapper">
                  <p class="task">Task 7</p>
                  <p class="task">Task 8</p>
                  <p class="task">Task 9</p>
                  <p class="task">Task 10</p>
                  <p class="task">Task 11</p>
                  <p class="task">Task 12</p>
                  <p class="task">Task 13</p>
                </div>
              </div>

              <div class="flex-column single">
                <p class="column-header">In Progress</p>
                <div class="flex-card-wrapper">

                  <p class="task">Task 6</p>
                </div>
              </div>

              <div class="flex-column double">
                <p class="column-header">Done</p>
                <div class="flex-card-wrapper">
                  <p class="task">Task 1</p>
                  <p class="task">Task 2</p>
                  <p class="task">Task 3</p>
                  <p class="task">Task 4 has a very long text to demonstate how different heights behave</p>
                  <p class="task">Task 5</p>
                </div>
              </div>
            </div>
          </div>

          <div class="feature-lane">
            <h1 class="text-box">Feature 2</h1>
            <div class="flex-container">

              <div class="flex-column double">
                <p class="column-header">Todo</p>
                <div class="flex-card-wrapper">
                  <p class="task">Task 8</p>
                  <p class="task">Task 9</p>
                  <p class="task">Task 10</p>
                  <p class="task">Task 11</p>
                  <p class="task">Task 12</p>
                  <p class="task">Task 13</p>
                </div>
              </div>

              <div class="flex-column single">
                <p class="column-header">In Progress</p>
                <div class="flex-card-wrapper">

                  <p class="task">Task 7</p>
                </div>
              </div>

              <div class="flex-column double">
                <p class="column-header">Done</p>
                <div class="flex-card-wrapper">
                  <p class="task">Task 1</p>
                  <p class="task">Task 2</p>
                  <p class="task">Task 3</p>
                  <p class="task">Task 4 has a very long text to demonstate how different heights behave</p>
                  <p class="task">Task 5</p>
                </div>
              </div>
            </div>
          </div>

          <div class="feature-lane">
            <h1 class="text-box">Feature 3</h1>
            <div class="flex-container">

              <div class="flex-column double">
                <p class="column-header">Todo</p>
                <div class="flex-card-wrapper">
                  <p class="task">Task 4 has a very long text to demonstate how different heights behave</p>
                  <p class="task">Task 5</p>
                  <p class="task">Task 6</p>
                  <p class="task">Task 7</p>
                  <p class="task">Task 8</p>
                  <p class="task">Task 9</p>
                  <p class="task">Task 10</p>
                  <p class="task">Task 11</p>
                  <p class="task">Task 12</p>
                  <p class="task">Task 13</p>
                </div>
              </div>

              <div class="flex-column single">
                <p class="column-header">In Progress</p>
                <div class="flex-card-wrapper">
                  <p class="task">Task 3</p>
                </div>
              </div>

              <div class="flex-column double">
                <p class="column-header">Done</p>
                <div class="flex-card-wrapper">
                  <p class="task">Task 1</p>
                  <p class="task">Task 2</p>


                </div>
              </div>
            </div>
          </div>

          <div class="feature-lane">
            <h1 class="text-box">Feature 4</h1>
            <div class="flex-container">

              <div class="flex-column double">
                <p class="column-header">Todo</p>
                <div class="flex-card-wrapper">
                  <p class="task">Task 12</p>
                  <p class="task">Task 13</p>
                </div>
              </div>

              <div class="flex-column single">
                <p class="column-header">In Progress</p>
                <div class="flex-card-wrapper">
                  <p class="task">Task 10</p>
                  <p class="task">Task 11</p>
                </div>
              </div>

              <div class="flex-column double">
                <p class="column-header">Done</p>
                <div class="flex-card-wrapper">
                  <p class="task">Task 1</p>
                  <p class="task">Task 2</p>
                  <p class="task">Task 3</p>
                  <p class="task">Task 4 has a very long text to demonstate how different heights behave</p>
                  <p class="task">Task 5</p>
                  <p class="task">Task 6</p>
                  <p class="task">Task 7</p>
                  <p class="task">Task 8</p>
                  <p class="task">Task 9</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
