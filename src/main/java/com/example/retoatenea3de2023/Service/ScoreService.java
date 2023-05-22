package com.example.retoatenea3de2023.Service;


import com.example.retoatenea3de2023.Model.Score;
import com.example.retoatenea3de2023.Repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return scoreRepository.findAll();
    }

    public Optional<Score> getScore(int id){
        return scoreRepository.getScore(id);
    }

    public Score save(Score score){
        if(score.getIdScore()==null){
            return scoreRepository.save(score);
        }else{
            Optional <Score> scoreEncontrado = getScore(score.getIdScore());
            if (scoreEncontrado.isEmpty()){
                return scoreRepository.save(score);
            }else {
                return score;
            }
        }
    }

    public Score update (Score score){
        if(score.getIdScore()!=null){
            Optional <Score> scoreEncontrado= getScore(score.getIdScore());
            if (scoreEncontrado.isPresent() ){
                if (score.getMessageText()!=null){
                    scoreEncontrado.get().setMessageText(score.getMessageText());
                }
                if (score.getStarts()!=null){
                    scoreEncontrado.get().setStarts(score.getStarts());
                }
                return scoreRepository.save(scoreEncontrado.get());
            } else {
                return score;
            }

        }else{
            return score;
        }
    }
    public boolean deleteScore (int id){
        boolean respuesta = getScore(id).map(score -> {
            scoreRepository.delete(score);
            return true;
        }).orElse(false);
        //Date fecha = new Date()
        return respuesta;
    }
}
