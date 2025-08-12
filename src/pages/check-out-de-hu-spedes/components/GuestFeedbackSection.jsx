import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const GuestFeedbackSection = ({ onFeedbackChange }) => {
  const [feedback, setFeedback] = useState({
    rating: 0,
    comments: '',
    wouldRecommend: null,
    categories: {
      cleanliness: 0,
      service: 0,
      location: 0,
      value: 0,
      amenities: 0
    }
  });

  const handleRatingChange = (rating) => {
    const updatedFeedback = {
      ...feedback,
      rating
    };
    setFeedback(updatedFeedback);
    onFeedbackChange(updatedFeedback);
  };

  const handleCategoryRating = (category, rating) => {
    const updatedFeedback = {
      ...feedback,
      categories: {
        ...feedback?.categories,
        [category]: rating
      }
    };
    setFeedback(updatedFeedback);
    onFeedbackChange(updatedFeedback);
  };

  const handleCommentsChange = (e) => {
    const updatedFeedback = {
      ...feedback,
      comments: e?.target?.value
    };
    setFeedback(updatedFeedback);
    onFeedbackChange(updatedFeedback);
  };

  const handleRecommendationChange = (wouldRecommend) => {
    const updatedFeedback = {
      ...feedback,
      wouldRecommend
    };
    setFeedback(updatedFeedback);
    onFeedbackChange(updatedFeedback);
  };

  const StarRating = ({ rating, onRatingChange, size = 20 }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className="transition-colors duration-200 hover:scale-110"
          >
            <Icon
              name="Star"
              size={size}
              className={star <= rating ? 'text-accent fill-current' : 'text-muted-foreground'}
            />
          </button>
        ))}
      </div>
    );
  };

  const categoryLabels = {
    cleanliness: 'Limpieza',
    service: 'Servicio',
    location: 'Ubicación',
    value: 'Relación Calidad-Precio',
    amenities: 'Instalaciones'
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Muy Malo';
      case 2: return 'Malo';
      case 3: return 'Regular';
      case 4: return 'Bueno';
      case 5: return 'Excelente';
      default: return 'Sin calificar';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="MessageSquare" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Comentarios del Huésped
          </h2>
          <p className="text-sm text-muted-foreground">
            Registra la opinión y valoración del huésped (opcional)
          </p>
        </div>
      </div>
      {/* Overall Rating */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Valoración General
        </label>
        <div className="flex items-center space-x-4">
          <StarRating 
            rating={feedback?.rating} 
            onRatingChange={handleRatingChange}
            size={24}
          />
          <span className="text-sm text-muted-foreground">
            {getRatingText(feedback?.rating)}
          </span>
        </div>
      </div>
      {/* Category Ratings */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Valoración por Categorías
        </label>
        <div className="space-y-4">
          {Object.entries(categoryLabels)?.map(([category, label]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm text-foreground min-w-0 flex-1">
                {label}
              </span>
              <div className="flex items-center space-x-3">
                <StarRating
                  rating={feedback?.categories?.[category]}
                  onRatingChange={(rating) => handleCategoryRating(category, rating)}
                  size={16}
                />
                <span className="text-xs text-muted-foreground w-20 text-right">
                  {getRatingText(feedback?.categories?.[category])}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recommendation */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          ¿Recomendaría nuestro hotel?
        </label>
        <div className="flex space-x-4">
          <button
            onClick={() => handleRecommendationChange(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              feedback?.wouldRecommend === true
                ? 'border-success bg-success/5 text-success' :'border-border hover:border-success/50 text-muted-foreground hover:text-success'
            }`}
          >
            <Icon name="ThumbsUp" size={16} />
            <span className="text-sm font-medium">Sí</span>
          </button>
          <button
            onClick={() => handleRecommendationChange(false)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              feedback?.wouldRecommend === false
                ? 'border-destructive bg-destructive/5 text-destructive' :'border-border hover:border-destructive/50 text-muted-foreground hover:text-destructive'
            }`}
          >
            <Icon name="ThumbsDown" size={16} />
            <span className="text-sm font-medium">No</span>
          </button>
        </div>
      </div>
      {/* Comments */}
      <div className="mb-6">
        <Input
          type="textarea"
          label="Comentarios Adicionales"
          placeholder="Registra cualquier comentario específico del huésped sobre su estancia..."
          value={feedback?.comments}
          onChange={handleCommentsChange}
          rows={4}
        />
      </div>
      {/* Feedback Summary */}
      {(feedback?.rating > 0 || feedback?.comments || feedback?.wouldRecommend !== null) && (
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground mb-1">
                Resumen de Valoración
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                {feedback?.rating > 0 && (
                  <div>Valoración general: {getRatingText(feedback?.rating)} ({feedback?.rating}/5)</div>
                )}
                {feedback?.wouldRecommend !== null && (
                  <div>
                    Recomendación: {feedback?.wouldRecommend ? 'Sí recomendaría' : 'No recomendaría'}
                  </div>
                )}
                {feedback?.comments && (
                  <div>Comentarios registrados: {feedback?.comments?.length} caracteres</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestFeedbackSection;