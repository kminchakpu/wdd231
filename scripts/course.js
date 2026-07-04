// Complete Course Data Matrix
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true 
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, and performance.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// Declare DOM target variables globally
let courseContainer;
let totalCreditsDisplay;

// Safely initialize elements once the HTML DOM tree finishes parsing in the browser
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM containers
    courseContainer = document.querySelector('#course-container');
    totalCreditsDisplay = document.querySelector('#total-credits');

    // Attach Click Listeners to Filter Buttons and update their active state
    document.querySelector('#btn-all').addEventListener('click', () => {
        displayCourses('all');
        setActiveButton('#btn-all');
    });
    
    document.querySelector('#btn-cse').addEventListener('click', () => {
        displayCourses('CSE');
        setActiveButton('#btn-cse');
    });
    
    document.querySelector('#btn-wdd').addEventListener('click', () => {
        displayCourses('WDD');
        setActiveButton('#btn-wdd');
    });

    // Run layout defaults on page start
    displayCourses('all');
    setActiveButton('#btn-all');
});

// Helper function to manage active styling state across button groups
function setActiveButton(activeButtonId) {
    const buttons = document.querySelectorAll('.buttons button');
    
    // Clear the active formatting class from all sister buttons
    buttons.forEach(button => button.classList.remove('active'));
    
    // Target and apply the active formatting class specifically to the clicked option
    const clickedButton = document.querySelector(activeButtonId);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Core render engine function
function displayCourses(filter = 'all') {
    // Safety check to ensure DOM references exist before rendering execution
    if (!courseContainer || !totalCreditsDisplay) return;

    // Flush out previous cards
    courseContainer.innerHTML = '';

    // Step 1: Filter raw data arrays
    const filteredCourses = filter === 'all' 
        ? courses 
        : courses.filter(course => course.subject === filter);

    // Step 2: Render individual module cards
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        
          card.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p class="course-credits"><strong>Credits:</strong> ${course.credits}</p>
            <p class="course-certificate"><strong>Certificate:</strong> ${course.certificate}</p>
            <p class="course-description">${course.description}</p>
            <p class="course-tech"><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        `;
        
        // Modal detail box remains intact as an alternate accessibility option
        card.addEventListener('click', () => {
            alert(`${course.title}\n\n${course.description}\n\nTechnologies: ${course.technology.join(', ')}`);
        });

        courseContainer.appendChild(card);
    });

    // Run reduce calculations based exclusively on visible cards 
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = totalCredits;
}