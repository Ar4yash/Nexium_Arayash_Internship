'use client';

import React, { useState, useEffect } from 'react';
import quotes from '../quotes';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const QuoteForm = () => {
  const [topic, setTopic] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [isMounted, setIsMounted] = useState(false); // NEW

  useEffect(() => {
    setIsMounted(true); // set true when client is ready
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = quotes
      .filter(q => q.topic.toLowerCase() === topic.toLowerCase())
      .slice(0, 3);
    setFilteredQuotes(results);
  };

  if (!isMounted) return null; // ⛔ don't render on server

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-6 text-slate-800 dark:text-slate-100">
        Motivational Quote Generator
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Enter a topic (e.g., success)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit" className="w-full">Get Quotes</Button>
      </form>

      <div className="mt-6 space-y-4">
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((quote, index) => (
            <Card
  key={index}
  className="transition duration-300 ease-in-out transform hover:scale-[1.02] bg-gradient-to-r from-slate-100 via-white to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
>
  <CardContent className="p-4 text-gray-800 dark:text-gray-100 font-medium text-lg">
    {quote.text}
  </CardContent>
</Card>


          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No quotes found for this topic.</p>
        )}
      </div>
    </div>
  );
};

export default QuoteForm;
