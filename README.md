# Gamified To-Do List

**Live Site:** https://gamified-to-do-azure.vercel.app/  
**Repository:** https://github.com/IHatePython375/Gamified-To-do

## 1. Introduction

To-do list apps are everywhere because they promise a simple solution: write tasks down, stay organized, and get more done. But for many people, traditional to-do lists don't actually feel helpful after a while. When the list grows long, it can feel overwhelming, and the app becomes more of a reminder of what hasn't been done than a tool that supports progress. Over time, this often leads to procrastination, stress, and eventually giving up on the app altogether.

This challenge is especially common among university students and young professionals who juggle classes, deadlines, work responsibilities, and personal commitments simultaneously. Many users struggle with two key needs that current tools don't meet well: (1) reducing the mental load of seeing too many tasks at once, and (2) maintaining motivation beyond simply checking boxes.

This project proposes a gamified smart to-do list designed to make task management feel more engaging and less stressful. Instead of only showing a checklist, the system introduces motivational features such as points, progress feedback, and structured task presentation to help users stay consistent over time. The goal is not just better organization, but better follow-through — supporting users who struggle with motivation, procrastination, or feeling overwhelmed by long task lists.

## 2. Vision of Solution

Users of current to-do list applications often struggle to remain motivated to continue to use them over time. As their list of incomplete tasks expands, users are overwhelmed by the sight of too many tasks at once, while marking a task as complete by simply clicking on a check box does not feel rewarding enough to compensate for the increased stress.

We improve the experience of using a to-do list by adding features to make completing tasks resemble completing achievements in a video game while maintaining the core functionality of a typical to-do list. Specifically, the user earns points for completing tasks, and can level up if they earn enough points, making it feel more rewarding to complete tasks.

## 3. Design

The core design philosophy was balancing simplicity with motivational mechanics. Every page is navigable from the same header, ensuring a consistent and learnable navigation experience. Adding, deleting, or modifying a task on any page reflects the change across all pages — users never have to repeat an action.

Each task has a user-assigned category with a configurable XP value. By default, three categories are provided (Homework, Chores, Work), and users can add additional categories in Settings. Categories can be customized with a name, XP value, and button color. This allows users to personally decide the weight and priority of different types of tasks without the system artificially inflating the worth of one category over another.

Progress bars are displayed on the Home, Today, and Week pages, giving immediate, smaller-scale feedback separate from the overarching level progression system. This was designed to keep users engaged at a day-to-day level without making the overall level progression feel too daunting.

## 4. Gamification System

The XP system is the core of the gamification mechanic. Each category has a defined XP value in Settings. When a task is completed and checked off, the XP value of that task's category is added to a lifetime tracking total. This total drives the level progression system.

At certain milestones, the user advances to a new level. Each level comes with a badge displayed in the header, giving immediate feedback and positive reinforcement. The system is inspired by competitive video games such as *Rocket League* and *League of Legends*, where tiered progression systems show the player's progress against defined milestones. Here, rather than competing against others, users compete with themselves to complete their tasks and advance.

XP values for categories are capped to a configurable range so users can't artificially inflate the worth of one category and progress levels too quickly. This preserves the integrity of the gamification system and prevents undermining the core purpose of the application.


## 5. Implementation

### 5.1 Technology Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React                       |
| Backend    | Node.js + Express           |
| Database   | SQLite                      |
| Auth       | JSON Web Tokens (JWT)       |
| Deployment | Vercel (FE) + Render (BE)   |

### 5.2 Authentication

The app features a working login page with a full authentication system backed by SQLite. Account creation and login use the database to validate credentials. The system correctly prints an error message if the user tries to enter incorrect or nonexistent credentials (i.e. the username and password combination is not in the Users table or the user tries to register with invalid credentials). The system successfully grants access to the website if credentials are entered correctly. If a user attempts to register with valid credentials (i.e. the given username is unique and the password is at least four characters), a new user is added to the database.

### 5.3 Pages & Features

**Header** — Appears on all pages. The left corner features a dropdown menu with links to the Today, Week, Month, and Home pages. The right side displays the user's current experience level (e.g. Bronze I, Silver II) with an image of the corresponding badge. Hovering over the image shows the XP needed to reach the next level. Users can also edit settings from the header, including toggling light/dark theme, updating credentials, adding custom categories with configurable XP and button color, and deleting categories.

**Home Page** — Displays yellow progress bars indicating the percentage of tasks completed for today and for the current week. The center window shows the current day's tasks, which the user can mark as complete. If no tasks exist for today, an instructional message is shown. A button with three dots navigates directly to the Today page.

**Today Page** — Users can view and manage tasks for the current day. A progress bar mirrors the one on the Home page. After clicking "Add Task," the user can assign a category or use the General category. Once a task is added, a button for the category appears on the right alongside the XP value the user will earn. Checking the box marks the task complete, awards XP, and updates the progress bar from red to yellow to green based on total completion percentage. Updates on the Today page are reflected on the Week, Month, and Home pages, and vice versa.

**Week Page** — Similar to Today, but users can assign tasks to any day of the current week (Monday through Sunday). Assignments sync bidirectionally with the Today page.

**Month Page** — A full calendar for the current month. Users can navigate to previous/next months and switch between years. Clicking on a day opens a calendar for that year, and clicking on a month opens the days in that month. Days with tasks show the number completed vs. total tasks. Days with overdue tasks display a warning with the count in red.

### 5.4 Deployment

To ensure the app can run on any device without requiring software installation, the frontend is deployed on Vercel and the backend on Render. Users access the site directly via URL. Any time a change is committed to the repository, the website is automatically redeployed and existing accounts are cleared from the database.

## 6. Reflection

We successfully achieved what we set out to do when implementing this application. The core functionality — authentication, task management across multiple views, XP tracking, and level progression — is fully working. The most difficult aspect of implementation was linking the frontend and backend together. Linking the two systems was the biggest challenge overall, but was overcome to create a viable solution.

The biggest challenge overall was deciding how to implement the application given our time constraints, the workload of other classes, and evaluation deadlines. Initially we intended to use C++ via Qt, but the realization that a Qt application would likely need to be an executable ruled that out for final evaluations. That led us to React and JavaScript, which required some amount of learning on the fly.

A key takeaway from this project is that, as developers, we must balance user input with the realities of the development process. Several interviewees suggested adding pet collection or house-building simulations to the project, believing these features would be simple to implement. Without any knowledge of our technical constraints, they thought those features were not feasible for this project. We still took their input seriously to find another potential gamified system that would keep users engaged, while balancing usability and scope. Ultimately, the badge system was determined to be the most achievable and beneficial approach for this project.

