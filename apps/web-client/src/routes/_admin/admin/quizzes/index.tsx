import { createFileRoute, Link } from '@tanstack/react-router';
import { Plus, Calendar } from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const Route = createFileRoute('/_admin/admin/quizzes/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Sample quiz data
  const quizzes = [
    { id: '1', title: 'Math Quiz', description: 'A quiz about basic math operations', createdAt: new Date('2024-12-27T11:50:00') },
    { id: '2', title: 'Science Quiz', description: 'A quiz about basic science concepts', createdAt: new Date('2024-12-26T10:30:00') },
  ];

  const handleAdd = () => {
    console.log('Adding quiz:', { title, description });

    setTitle('');
    setDescription('');
    setOpen(false);
  };

  return (
    <div className="p-4 max-w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <p className="text-muted-foreground mt-1">Manage your quizzes</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-700 rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Quiz
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-106.25 rounded-2xl">
            <DialogHeader>
              <DialogTitle className='text-xl'>Add Quiz</DialogTitle>
              <DialogDescription>
                Create a new quiz. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter quiz title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter quiz description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="h-10 px-6 text-base rounded-lg hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAdd} 
                className="bg-blue-500 hover:bg-blue-700 rounded-lg h-10 px-6 text-base"
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Link
            key={quiz.id}
            to="/admin/quizzes/$quiz-id"
            params={{ 'quiz-id': quiz.id }}
            className="block p-6 bg-card rounded-lg border hover:border-blue-500 hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>{quiz.description}</span>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="w-3 h-3" />
                <span>Updated {formatDistanceToNow(quiz.createdAt, { addSuffix: true })}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}