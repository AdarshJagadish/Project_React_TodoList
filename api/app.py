from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data
tasks = [
    {'id': 1, 'title': 'Learn Flask', 'description': 'Understand the basics of Flask', 'completed': False},
    {'id': 2, 'title': 'Build a Todo App', 'description': 'Create a simple todo application', 'completed': False}
]

def get_next_id():
    """Get the next available task ID."""
    return max(task['id'] for task in tasks) + 1 if tasks else 1

# Get all tasks
@app.route('/api/task/', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

# Add a new task
@app.route('/api/task/', methods=['POST'])
def add_task():
    new_task = request.get_json()
    
    # Validate input
    if 'title' not in new_task or 'description' not in new_task:
        return jsonify({'error': 'Title and description are required'}), 400
    
    new_task['id'] = get_next_id()  # Assign a new ID
    tasks.append(new_task)
    return jsonify(new_task), 201

# Update a task
@app.route('/api/task/<int:task_id>/', methods=['PUT'])
def update_task(task_id):
    task = next((task for task in tasks if task['id'] == task_id), None)
    
    if task is None:
        return jsonify({'error': 'Task not found'}), 404
    
    data = request.get_json()
    
    # Update task fields
    if 'title' in data:
        task['title'] = data['title']
    if 'description' in data:
        task['description'] = data['description']
    if 'completed' in data:
        task['completed'] = data['completed']
    
    return jsonify(task)

# Delete a task
@app.route('/api/task/<int:task_id>/', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({'result': 'Task deleted'})

if __name__ == '__main__':
    app.run(debug=True, port=8000)